import express from "express";
import languageService from "../services/language-service.js";

const languageRoutes = express.Router();

languageRoutes.get("/languages", languageService.findAll);
languageRoutes.get("/languages/name", languageService.findByName);
languageRoutes.get("/languages/:id", languageService.findById);
languageRoutes.post("/languages", languageService.save);
// languageRoutes.put("/languages/:id", languageService.update);
languageRoutes.delete("/languages/:id", languageService.remove);

export default languageRoutes;