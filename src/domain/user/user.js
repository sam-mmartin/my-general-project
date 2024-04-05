import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    username: { type: String },
    password: { type: String }
}, { versionKey: false });

const user = mongoose.model("users", userSchema);

export default user;