const errorHandler = (error, request, response, next) => {

    if (error.name === "CastError") {
        return response.status(400).send("Invalid restaurant ID");
    }

    if (error.name === "ValidationError") {
        return response.status(400).send(error.message);
    }

    response.status(500).send("Something went wrong");
};

module.exports = errorHandler;