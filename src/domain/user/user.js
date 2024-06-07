import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required:[true, "The name is required"] },
    username: { type: String, required: [true, "The username is required"] },
    password: { type: String, required: [true, "The password is required"] },
    work: {type: String},
    phone: {
        type: Number,
        validate: {
            validator: (value) => {
                const v = value.toString();
                return /\d{11}/.test(v) && value > 0;
            },
            message: "Número de telefone inválido"
        }
    }
}, { versionKey: false });

const user = mongoose.model("users", userSchema);

export { user, userSchema };