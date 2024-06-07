import RequestError from "./request-exception.js";

class ValidationError extends RequestError {
    constructor(error) {
        const message = Object.values(error.errors)
            .map(err => err.message).join("; ");

        super(`Ocorreram os seguintes erros: ${message}`);
    }
}

export default ValidationError;