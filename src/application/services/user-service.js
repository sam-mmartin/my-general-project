import UserRepository from "../../infrastructure/repositories/user/user-repository.js";
import UserLanguageRepository from "../../infrastructure/repositories/many-to-many/user-language-repository.js";
import LanguageRepository from "../../infrastructure/repositories/language/language-repository.js";
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
        const userFinded = await UserRepository.getById(req.params.id);

        if (userFinded !== null) {
            const languagesUser = await UserLanguageRepository.getLanguagesByUser(userFinded);
            const onlyLangs = languagesUser.map(item => item.language);
            const userResponse = {...userFinded._doc, languages: onlyLangs};

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
        const userInfos = {
            name: newUser.name,
            username: newUser.username,
            password: newUser.password,
            work: newUser.work,
            phone: newUser.phone
        };
        const userCreated = await UserRepository.create(userInfos);

        for(var x in languages) {
            const langCreated = await LanguageRepository.create(languages[x]);
            const userLang = { user: userCreated, language: langCreated };
            await UserLanguageRepository.create(userLang);
        }

        const languagesUser = await UserLanguageRepository.getLanguagesByUser(userCreated);
        const userResponse = {...userCreated._doc, languages: languagesUser.map(item => item.language)};

        const response = {
            message: "Novo usuário cadastrado.",
            data: userResponse
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
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