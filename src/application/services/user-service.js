import UserRepository from '../../infrastructure/repositories/user/user-repository.js';

const getAllUsers = async (req, res) => {
    const response = await UserRepository.getAll(req, res);

    console.log(response);

    if (response.length > 0) {
        res.status(200).json(response);
    } else {
        res.status(204).json({
            message: response,
            data: []
        });
    }
}

const getUserById = async (req, res) => {
    const userFinded = await UserRepository.getById(req.params.id);
    const response = {
        message: "",
        data: userFinded
    };
    res.status(200).json(response);
}

const createNewUser = async (req, res) => {
    const newUser = req.body;
    const userCreated = await UserRepository.create(newUser);
    const response = {
        message: "Novo usuário cadastrado.",
        data: userCreated
    };

    res.status(201).json(response);
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    const userUpdated = await UserRepository.update(id, userData);
    const response = {
        message: "Dados do usuário atualizados.",
        data: userUpdated
    };

    res.status(200).json(response);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const userDeleted = await UserRepository.delete(id);
    const response = {
        message: `Usuário ${id} removido`,
        data: userDeleted
    };

    res.status(200).json(response);
}

const userService = {
    getAll: getAllUsers,
    getById: getUserById,
    create: createNewUser,
    update: updateUser,
    delete: deleteUser
}

export default userService;