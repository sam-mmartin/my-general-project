import ErrorDefault from "./base-exception.js";

class ResourceNotFoundError extends ErrorDefault {
    constructor(message) {
        super(message, 404);
    }
}

export default ResourceNotFoundError;