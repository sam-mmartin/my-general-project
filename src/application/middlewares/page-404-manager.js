import ResourceNotFoundError from "../exceptions/not-found-exception.js";

function page404Manager(req, res, next) {
    const error = new ResourceNotFoundError("Página não encontrada");
    next(error);
}

export default page404Manager;