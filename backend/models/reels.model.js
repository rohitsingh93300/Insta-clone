import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    videoUrl: {type:String, required:true},
    title: {type:String, required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    cloudinaryId: {
        type: String,
        required: true,
      },

}, {timestamps:true})


export const Reel = mongoose.model('Reel', reelSchema);