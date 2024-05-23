import mongoose from "mongoose";

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} = process.env;

async function dbConnect() {
    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

    try {
        mongoose.connect(url, {});
    } catch (error) {
        console.log(error);
    }

    return mongoose.connection;
}

export default dbConnect;