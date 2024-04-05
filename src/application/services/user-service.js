import UserRepository from '../../infrastructure/repositories/user/user-repository.js';

const getAllUsers = async (req, res) => {
    const users = UserRepository.getAll(req, res);
    return users;
}

const createNewUser = async () => {
    return UserRepository.create();
}

const userService = {
    getAll: getAllUsers
}

export default userService;