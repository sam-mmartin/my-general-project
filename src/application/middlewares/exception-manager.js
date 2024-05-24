import mongoose from "mongoose";
import ErrorDefault from "../exceptions/base-exception";

// eslint-disable-next-line no-unused-vars
const exceptionManager = (error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: error.message });
    } else {
        new ErrorDefault().sendResponse(res);
    }
};

export default exceptionManager;