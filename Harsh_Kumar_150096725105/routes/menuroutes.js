const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/menucontroller');
router.get('/:id/menu', controller.list);
router.post('/:id/menu', auth, controller.create);
router.put('/menu/:id', auth, controller.update);
router.delete('/menu/:id', auth, controller.remove);
module.exports = router;
