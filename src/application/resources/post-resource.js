import express from 'express';
import postService from '../services/post-service.js';

const postRoutes = express.Router();

postRoutes.get("/posts", postService.getAll);
postRoutes.get("/posts/postoftheuser", postService.getPostsByUser);
postRoutes.post("/posts", postService.create);
postRoutes.put("/posts/:id", postService.update);
postRoutes.delete("/posts/:id", postService.delete);

export default postRoutes;