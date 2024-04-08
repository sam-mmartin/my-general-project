import mongodb from 'mongodb';
import post from "../../../domain/post/post.js"
import UserRepository from '../user/user-repository.js';

class PostRepository {
    static async getAll() {
        const posts = await post.find();
        return posts;
    }

    static async create(newPost) {
        try {
            const user = await UserRepository.getById(newPost.user);
            const postFull = {
                ...newPost,
                user: { ...user }
            };
            const postCreated = await post.create(postFull);

            return postCreated
        } catch (error) {
            return `${error.message} - Não foi possível adicionar o post.`;
        }
    }

    static async update(id, content) {
        try {
            const postID = new mongodb.ObjectId(id);
            const postUpdated = await post.updateOne(
                { _id: postID },
                {
                    $set: { content: content },
                }
            );

            return postUpdated;
        } catch (error) {
            return `${error.message} - Erro na solicitação.`;
        }
    }

    static async delete(id) {
        try {
            const postID = new mongodb.ObjectId(id);
            const postDeleted = await post.deleteOne({ _id: postID });
            return postDeleted;
        } catch (error) {
            return `${error.message} - Erro na solicitação.`;
        }
    }

    static async getPostsByUser(user) {
        try {
            const userFinded = await UserRepository.getById(user);
            const postsOfTheUser = await post.find({ user: userFinded });
            return postsOfTheUser;
        } catch (error) {
            return `${error.message} - Erro na solicitação`;
        }
    }
}

export default PostRepository;