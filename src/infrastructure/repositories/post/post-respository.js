import post from "../../../domain/post/post.js"

class PostRepository {
    static async getAll(req, res) {
        const posts = await post.find();
        res.status(200).json(posts);
    }

    static async create(req, res) {
        try {
            const newPost = await post.create(req.body);
            res.status(201).json({
                message: "Novo post adicionado.",
                post: newPost
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Não foi possível adicionar o post.`
            });
        }
    }
}

export default PostRepository;