import ErrorDefault from "./base-exception.js";

class AlreadyExistsError extends ErrorDefault {
    constructor(message="O recurso já está cadastrado na base dados.") {
        super(message, 409);
    }
}

export default AlreadyExistsError;