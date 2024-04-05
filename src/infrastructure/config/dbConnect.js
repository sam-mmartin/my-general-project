import mongoose from "mongoose";

async function dbConnect() {
    try {
        mongoose.connect(process.env.DB_CONNECTION_STRING, {});
    } catch (error) {
        console.log(error)
    }

    return mongoose.connection;
}

export default dbConnect;