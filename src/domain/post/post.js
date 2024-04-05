import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String, required: true },
}, { versionKey: false });

const post = mongoose.model("posts", postSchema);

export default post;