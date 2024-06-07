import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    image: { type: String },
    startDateUse: { type: Date },
    user: {type: mongoose.Types.ObjectId, ref: "users"}
}, { versionKey: false });

const language = mongoose.model("languages", languageSchema);

export { language, languageSchema };