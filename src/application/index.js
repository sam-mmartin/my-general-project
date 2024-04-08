import express from 'express';
import userRoutes from "./resources/user-resource.js";
import postRoutes from './resources/post-resource.js';

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Meu Projeto Geral"));

    app.use(express.json(), userRoutes, postRoutes);
}

export default routes;