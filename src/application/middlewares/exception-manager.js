import mongoose from "mongoose";
import ErrorDefault from "../exceptions/base-exception.js";
import RequestError from "../exceptions/request-exception.js";
import ResourceNotFoundError from "../exceptions/not-found-exception.js";
import ValidationError from "../exceptions/validation-exception.js";
import AlreadyExistsError from "../exceptions/already-exists.js";

// eslint-disable-next-line no-unused-vars
const exceptionManager = (error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError) {
        new RequestError().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else if (error instanceof ResourceNotFoundError) {
        error.sendResponse(res);
    } else if (error instanceof AlreadyExistsError) {
        error.sendResponse(res);
    } else {
        new ErrorDefault().sendResponse(res);
    }
};

export default exceptionManager;