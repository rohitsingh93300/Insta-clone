import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createStory, getActiveStories, viewStory } from "../controllers/story.controller.js";


const router = express.Router();

// Route for creating a new story
router.route('/createstory').post(isAuthenticated, upload.single('image'),createStory)

// Other routes (viewing stories, etc.)
router.route('/stories').get(isAuthenticated,getActiveStories);
router.route('/stories/:storyId/view').post(isAuthenticated, viewStory);
 
export default router;