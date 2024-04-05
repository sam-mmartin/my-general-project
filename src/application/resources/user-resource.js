import express from "express";
import userService from "../services/user-service.js";

const userRoutes = express.Router();

userRoutes.get("/users", userService.getAll);

export default userRoutes;