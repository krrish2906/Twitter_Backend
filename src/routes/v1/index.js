import express from 'express';

// Importing controllers
import { createTweet, getTweet } from '../../controllers/tweet-controller.js'
import { toggleLike } from '../../controllers/like-controller.js'
import { createComment } from '../../controllers/comment-controller.js'
import { signup, login } from '../../controllers/auth-controller.js'

// Importing middlewares
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

// Tweet Routes
router.post('/tweets', authenticate, createTweet);
router.get('/tweets/:tweetId', getTweet);

// Like Routes
router.post('/likes/toggle', authenticate, toggleLike);

// Comment Routes
router.post('/comments', authenticate, createComment);

// User Routes
router.post('/signup', signup);
router.post('/login', login);

export default router;