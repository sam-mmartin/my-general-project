import PostRepository from "../../infrastructure/repositories/post/post-respository.js";

const getAllPosts = async (req, res) => {
    const posts = PostRepository.getAll(req, res);
    return posts;
};

const createPost = async (req, res) => {
    const retorno = PostRepository.create(req, res);
    return retorno;
}

const postService = {
    getAll: getAllPosts,
    create: createPost
};

export default postService;