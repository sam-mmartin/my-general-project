import ErrorDefault from "./base-exception.js";

class RequestError extends ErrorDefault {
    constructor(message = "Um ou mais dados fornecidos estão incorretos") {
        super(message, 400);
    }
}

export default RequestError;