import mongodb from "mongodb";
import { user } from "../../../domain/index.js";

class UserRepository {
    static async getAll() {
        const allUsers = await user.find();
        return allUsers;
    }

    static async getById(id) {
        const findUser = await user.findById(id);
        return findUser;
    }

    static async getByFilter(parameters) {
        const findUser = await user.find(parameters);
        return findUser;
    }

    static async create(newUser) {
        const userCreated = await user.create(newUser);
        return userCreated;
    }

    static async update(id, userData) {
        try {
            const userID = new mongodb.ObjectId(id);
            const userUpdated = await user.updateOne(
                { _id: userID },
                {
                    $set: {
                        name: userData.name,
                        username: userData.username,
                        password: userData.password
                    }
                }
            );

            return userUpdated;
        } catch (error) {
            return `${error.message} - Erro na solicitação`;
        }
    }

    static async delete(id) {
        try {
            const userID = new mongodb.ObjectId(id);
            const userDeleted = await user.deleteOne({ _id: userID });
            return userDeleted;
        } catch (error) {
            return `${error.message} - Erro na solicitação.`;
        }
    }
}

export default UserRepository;