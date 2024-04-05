import user from "../../../domain/user/user.js"

class UserRepository {
    static async getAll(req, res) {
        const users = await user.find()
        res.status(200).json(users);
    }

    static async create(req, res) {
        try {
            const newUser = await user.create(req.body);
            res.status(201).json({
                message: "Novo usuário cadastrado com sucesso.",
                user: newUser
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Não foi possível cadastrar o usuário.`
            });
        }
    }
}

export default UserRepository;