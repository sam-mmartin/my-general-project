import { userLanguage } from "../../../domain/index.js";

class UserLanguageRepository {
    static async create(newUserLanguage) {
        const created = userLanguage.create(newUserLanguage);
        return created;
    }

    static async getLanguagesByUser(user) {
        const languages = userLanguage.find({user: user}).populate("language");
        return languages;
    }
}

export default UserLanguageRepository;