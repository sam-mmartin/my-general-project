import mongoose from 'mongoose';
import { userSchema } from '../user/user.js';

const postSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String, required: true },
    user: userSchema
}, { versionKey: false });

const post = mongoose.model("posts", postSchema);

export default post;