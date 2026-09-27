import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const auth = () => localStorage.getItem('token');

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (auth()) headers.Authorization = `Bearer ${auth()}`;
  const response = await fetch(`${API}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [restaurants, setRestaurants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', email: '', password: '' });
  const [restaurantForm, setRestaurantForm] = useState({ name:'', city:'', address:'', cuisine:'', rating:'' });
  const [menuForm, setMenuForm] = useState({ name:'', price:'', isAvailable:true });

  async function loadRestaurants() {
    try { setRestaurants(await request('/restaurants')); } catch (e) { setError(e.message); }
  }
  useEffect(() => { loadRestaurants(); }, []);

  async function submitAuth(e) {
    e.preventDefault(); setError('');
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const body = authMode === 'login' ? { email: authForm.email, password: authForm.password } : authForm;
      const data = await request(endpoint, { method:'POST', body:JSON.stringify(body) });
      localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); setUser(data.user);
    } catch (e) { setError(e.message); }
  }

  async function selectRestaurant(r) {
    setSelected(r); setRestaurantForm({ name:r.name, city:r.city, address:r.address, cuisine:r.cuisine, rating:r.rating ?? '' });
    try { setMenu(await request(`/restaurants/${r._id}/menu`)); } catch (e) { setError(e.message); }
  }

  async function saveRestaurant(e) {
    e.preventDefault(); setError('');
    try {
      const body = { ...restaurantForm, rating: restaurantForm.rating === '' ? undefined : Number(restaurantForm.rating) };
      const data = selected ? await request(`/restaurants/${selected._id}`, { method:'PUT', body:JSON.stringify(body) }) : await request('/restaurants', { method:'POST', body:JSON.stringify(body) });
      await loadRestaurants(); selectRestaurant(data); setRestaurantForm({ name:'', city:'', address:'', cuisine:'', rating:'' });
    } catch (e) { setError(e.message); }
  }

  async function deleteRestaurant() {
    if (!selected || !confirm('Delete this restaurant and its menu?')) return;
    try { await request(`/restaurants/${selected._id}`, { method:'DELETE' }); setSelected(null); setMenu([]); await loadRestaurants(); }
    catch (e) { setError(e.message); }
  }

  async function addMenu(e) {
    e.preventDefault(); if (!selected) return;
    try { const item = await request(`/restaurants/${selected._id}/menu`, { method:'POST', body:JSON.stringify({ ...menuForm, price:Number(menuForm.price) }) }); setMenu([...menu,item]); setMenuForm({name:'',price:'',isAvailable:true}); }
    catch (e) { setError(e.message); }
  }

  async function deleteMenu(id) {
    try { await request(`/restaurants/menu/${id}`, { method:'DELETE' }); setMenu(menu.filter(x => x._id !== id)); } catch (e) { setError(e.message); }
  }

  if (!user) return <main className="auth"><div className="card"><h1>Restaurant Manager</h1><p>{authMode === 'login' ? 'Sign in to manage restaurants.' : 'Create an account to get started.'}</p><form onSubmit={submitAuth}>{authMode === 'register' && <input placeholder="Username" value={authForm.username} onChange={e=>setAuthForm({...authForm,username:e.target.value})} required/>}<input type="email" placeholder="Email" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} required/><input type="password" placeholder="Password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} required/><button>{authMode === 'login' ? 'Login' : 'Register'}</button></form><button className="link" onClick={()=>setAuthMode(authMode==='login'?'register':'login')}>{authMode==='login'?'Need an account? Register':'Already registered? Login'}</button>{error && <p className="error">{error}</p>}</div></main>;

  return <div><header><h1>Restaurant Management</h1><div>Welcome, {user.username} <button onClick={()=>{localStorage.clear();setUser(null)}}>Logout</button></div></header><main className="layout"><aside><h2>Restaurants</h2>{restaurants.map(r=><button className={selected?._id===r._id?'restaurant active':'restaurant'} key={r._id} onClick={()=>selectRestaurant(r)}><strong>{r.name}</strong><span>{r.city} · {r.cuisine}</span></button>)}{!restaurants.length&&<p>No restaurants yet.</p>}</aside><section><h2>{selected ? 'Edit Restaurant' : 'Add Restaurant'}</h2><form className="form" onSubmit={saveRestaurant}>{['name','city','address','cuisine'].map(k=><input key={k} placeholder={k[0].toUpperCase()+k.slice(1)} value={restaurantForm[k]} onChange={e=>setRestaurantForm({...restaurantForm,[k]:e.target.value})} required/>)}<input type="number" min="0" max="5" step="0.1" placeholder="Rating (0-5)" value={restaurantForm.rating} onChange={e=>setRestaurantForm({...restaurantForm,rating:e.target.value})}/><div><button>{selected?'Update Restaurant':'Add Restaurant'}</button>{selected&&<button type="button" className="danger" onClick={deleteRestaurant}>Delete</button>}</div></form>{selected&&<><hr/><h2>Menu</h2><form className="form inline" onSubmit={addMenu}><input placeholder="Item name" value={menuForm.name} onChange={e=>setMenuForm({...menuForm,name:e.target.value})} required/><input type="number" min="0" step="0.01" placeholder="Price" value={menuForm.price} onChange={e=>setMenuForm({...menuForm,price:e.target.value})} required/><button>Add Item</button></form><div className="menu">{menu.map(item=><div className="item" key={item._id}><span><strong>{item.name}</strong> — ₹{item.price} {item.isAvailable?'':'(unavailable)'}</span><button className="danger" onClick={()=>deleteMenu(item._id)}>Delete</button></div>)}{!menu.length&&<p>No menu items.</p>}</div></>}</section></main>{error&&<div className="toast error">{error}</div>}</div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
