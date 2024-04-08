import express from "express";
import userService from "../services/user-service.js";

const userRoutes = express.Router();

userRoutes.get("/users", userService.getAll);
userRoutes.get("/users/:id", userService.getById);
userRoutes.post("/users", userService.create);
userRoutes.put("/users/:id", userService.update);
userRoutes.delete("/users/:id", userService.delete);

export default userRoutes;