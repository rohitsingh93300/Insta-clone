import { Reel } from "../models/reels.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const uploadReel = async (req, res) => {
     try {
       const { title } = req.body;
       const file = req.file;

       if(!title || !file){
        return res.status(400).json({message:"something is missing", success:false})
       }

       const fileUri = getDataUri(file)
  
       // Upload video to Cloudinary
       const res = await cloudinary.uploader.upload({fileUri});
  
       const newReel = new Reel({
         title,
         videoUrl: res.secure_url,
         cloudinaryId: res.public_id,
         user: req.id, // Assuming user is authenticated
       });
  
       await newReel.save();
       res.status(201).json({ message: 'Reel uploaded successfully', reel: newReel, success: true });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error, success:false });
     }


     
  
  };