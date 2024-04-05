import express from 'express';
import postService from '../services/post-service.js';

const postRoutes = express.Router();

postRoutes.get("/posts", postService.getAll);
postRoutes.post("/posts", postService.create);

export default postRoutes;