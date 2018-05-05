import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all posts
router.route('/posts').get(PostController.getPosts);

// Get single post
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new post
router.route('/posts').post(PostController.addPost);

// Delete a post
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
