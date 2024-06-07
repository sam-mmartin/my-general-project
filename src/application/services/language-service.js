import {LanguageRepository} from "../../infrastructure/repositories/index.js";
import RequestError from "../exceptions/request-exception.js";
import ResourceNotFoundError from "../exceptions/not-found-exception.js";

const findAll = async (req, res, next) => {
    try {
        const response = await LanguageRepository.getAll(req, res);

        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await LanguageRepository.getById(id);

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(404).send({ message: `Language ${id} não encontrada` });
        }
    } catch (error) {
        next(error);
    }
};

const findByName = async (req, res, next) => {
    try {
        const name = req.query.name;
        const response = await LanguageRepository.getByName(name);

        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            next(new ResourceNotFoundError(
                "Nenhuma linguagem encontrada. Verifique o dado informado."
            ));
        }
    } catch (error) {
        next(error);
    }
};

const save = async (req, res, next) => {
    try {
        const language = req.body;
        const created = await LanguageRepository.create(language);

        const response = {
            message: "Linguagem cadastrada com sucesso.",
            data: created
        };
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const languageUpdated = req.body;
        const response = await LanguageRepository.updateOne(id, languageUpdated);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const removeOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await LanguageRepository.removeOne(id);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const languageService = {
    findAll: findAll,
    findById: findById,
    findByName: findByName,
    save: save,
    update: updateOne,
    remove: removeOne
};

export default languageService;