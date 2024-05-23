import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
const exceptionManager = (error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: error.message });
    } else {
        res.status(500).send({ message: error.message });
    }
};

export default exceptionManager;