import mongoose from "mongoose";

const userLanguageSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    language: { type: mongoose.Types.ObjectId, ref: "languages" }
}, { versionKey: false });

const userLanguage = mongoose.model("userLanguages", userLanguageSchema);

export { userLanguage, userLanguageSchema };