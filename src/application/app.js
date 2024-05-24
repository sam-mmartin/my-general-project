import express from "express";
import dbConnect from "../infrastructure/config/dbConnect.js";
import routes from "./index.js";
import exceptionManager from "./middlewares/exception-manager.js";
import page404Manager from "./middlewares/page-404-manager.js";

const connectionDB = await dbConnect();
connectionDB.on("error", (err) => {
    console.log("Erro de conexão ", err);
});

connectionDB.once("open", () => {
    console.log("Conexão com banco bem sucedida.");
});

const app = express();
routes(app);

app.use(page404Manager);
app.use(exceptionManager);

export default app;