import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    image: { type: String },
    startDateUse: { type: Date }
}, { versionKey: false });

const language = mongoose.model("languages", languageSchema);

export { language, languageSchema };