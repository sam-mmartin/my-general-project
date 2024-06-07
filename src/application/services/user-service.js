import {
    LanguageRepository,
    UserRepository
} from "../../infrastructure/repositories/index.js";
import ResourceNotFoundError from "../exceptions/not-found-exception.js";

const getAllUsers = async (req, res) => {
    const response = await UserRepository.getAll(req, res);

    if (response.length > 0) {
        res.status(200).json(response);
    } else {
        res.status(204).json({
            message: response,
            data: []
        });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await UserRepository.getById(req.params.id);

        if (user !== null) {
            const languagesUser = await LanguageRepository.getByUserId(user._id);
            const onlyLangs = languagesUser.map(item => {
                return {
                    name: item.name,
                    image: item.image,
                    startDateUse: item.startDateUse
                };
            });
            const userResponse = {...user._doc, languages: onlyLangs};

            const response = {
                message: "",
                data: userResponse
            };

            res.status(200).json(response);
        } else {
            next(new ResourceNotFoundError(
                "Usuário não encontrado. Verifique o ID informado."
            ));
        }
    } catch (error) {
        next(error);
    }
};

const searchUser = async (req, res, next) => {
    try {
        const parameters = getParameters(req.query);
        const users = await UserRepository.getByFilter(parameters);

        if (users.length > 0) {
            const response = {
                message: "",
                data: users
            };
            res.status(200).json(response);
        } else {
            next(new ResourceNotFoundError(
                "Nenhum usuário encontrado. Verifique o dado informado."
            ));
        }
    } catch (error) {
        next(error);
    }
};

const getParameters = (query) => {
    const {username, name, work} = query;
    const parameters = {};

    if (username) parameters.username = username;
    if (name) parameters.name = {$regex: name, $options: "i"};
    if (work) parameters.work = {$regex: work, $options: "i"};

    return parameters;
};

const createNewUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const languages = newUser.languages;
        const user = await save(newUser);
        const langsDocs = [];

        for(var x in languages) {
            const newLang = {
                ...languages[x],
                user: user._id
            };
            const langCreated = await LanguageRepository.create(newLang);
            langsDocs.push(langCreated);
        }

        const userResponse = {...user._doc, languages: langsDocs};

        const response = {
            message: "Novo usuário cadastrado.",
            data: userResponse
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const save = async (user) => {
    const newUser = {
        name: user.name,
        username: user.username,
        password: user.password,
        work: user.work,
        phone: user.phone
    };
    const userCreated = await UserRepository.create(newUser);
    return userCreated;
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    const userUpdated = await UserRepository.update(id, userData);
    const response = {
        message: "Dados do usuário atualizados.",
        data: userUpdated
    };

    res.status(200).json(response);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const userDeleted = await UserRepository.delete(id);
    const response = {
        message: `Usuário ${id} removido`,
        data: userDeleted
    };

    res.status(200).json(response);
};

const userService = {
    getAll: getAllUsers,
    getById: getUserById,
    search: searchUser,
    create: createNewUser,
    update: updateUser,
    delete: deleteUser
};

export default userService;