import PostRepository from "../../infrastructure/repositories/post/post-respository.js";


const getAllPosts = async (req, res) => {
    const posts = await PostRepository.getAll();
    const response = {
        message: "",
        data: posts
    };

    res.status(200).json(response);
};

const createPost = async (req, res) => {
    const newPost = req.body;
    const postCreated = await PostRepository.create(newPost);
    const response = {
        message: "Novo post adicionado.",
        data: postCreated
    };

    res.status(201).json(response);
}

const updatePost = async (req, res) => {
    const id = req.params.id;
    const postContent = req.body;
    const postUpdated = await PostRepository.update(id, postContent.content);
    const response = {
        message: `Post ${id} atualizado`,
        data: postUpdated
    }

    res.status(200).json(response);
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    const postDeleted = await PostRepository.delete(id);
    const response = {
        message: `Post ${id} apagado.`,
        data: postDeleted
    };

    res.status(200).json(response);
}

const getPostsByUser = async (req, res) => {
    const user = req.query.user;
    const postsOfTheUser = await PostRepository.getPostsByUser(user);
    const response = {
        message: "",
        data: postsOfTheUser
    };

    res.status(200).json(response);
}

const postService = {
    getAll: getAllPosts,
    create: createPost,
    update: updatePost,
    delete: deletePost,
    getPostsByUser: getPostsByUser
};

export default postService;