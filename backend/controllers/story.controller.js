import sharp from "sharp";
import { Story } from "../models/story.model.js";
import cloudinary from "../utils/cloudinary.js";
// import {User} from "../models/user.model"


// Create a new image story
export const createStory = async (req, res) => {
    try {
        const  imageUrl  = req.file;
        const authorId = req.id;

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image URL is required', success:false });
        }

        //Image upload
        const optimizedImageBuffer = await sharp(imageUrl.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        //buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri)

        const story = await Story.create({
            user: authorId, // Assuming req.id is populated by authentication middleware
            imageUrl: cloudResponse?.secure_url,
        });

        await story.populate({ path: 'user', select: 'username' });

        res.status(201).json({ message: 'Image story created successfully',success:true, story });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to create story', success:false });
    }
};

// Get all active image stories
export const getActiveStories = async (req, res) => {
    try {
        const currentTime = new Date();

        // Find all stories that haven't expired   
        // {
        //     expiresAt: { $gt: currentTime }
        // }
        const stories = await Story.find().populate({path:'user', select:'username profilePicture'}); // Populate user data

        res.status(200).json({sucess:true, stories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
};

// Mark a story as viewed by the user
export const viewStory = async (req, res) => {
    try {
        const { storyId } = req.params;

        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        // Add user to viewers if they haven't already viewed the story
        if (!story.viewers.includes(req.user._id)) {
            story.viewers.push(req.user._id);
            await story.save();
        }

        res.status(200).json({ message: 'Story viewed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to view story' });
    }
};

// Delete expired stories (optional background job)
export const deleteExpiredStories = async () => {
    try {
        const currentTime = new Date();

        // Delete stories that have expired
        await Story.deleteMany({ expiresAt: { $lt: currentTime } });

        console.log('Expired stories deleted');
    } catch (error) {
        console.error('Failed to delete expired stories:', error);
    }
};
