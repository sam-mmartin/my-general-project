import { language } from "../../../domain/language/language-schema.js";

class LanguageRepository {
    static async getAll() {
        const allLanguages = await language.find();
        return allLanguages;
    }

    static async getById(id) {
        const findLanguage = await language.findById(id);
        return findLanguage;
    }

    static async create(newLanguage) {
        const languageCreated = await language.create(newLanguage);
        return languageCreated;
    }

    static async updateOne(id, languageUpdated) {
        const updated = await language.updateOne(
            { _id: id },
            {
                $set: {
                    name: languageUpdated.name,
                    image: languageUpdated.image
                }
            }
        );

        return updated;
    }

    static async removeOne(id) {
        const deleted = await language.deleteOne({ _id: id });
        return deleted;
    }
}

export default LanguageRepository;