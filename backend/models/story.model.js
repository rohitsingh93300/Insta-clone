import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    imageUrl: {type:String, required:true},
    viewers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]

}, {timestamps:true})


// storySchema.pre('save', function (next) {
//     // Automatically set expiration time to 24 hours from creation
//     if (!this.expiresAt) {
//       this.expiresAt = new Date(this.createdAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
//     }
//     next();
//   });

export const Story = mongoose.model('Story', storySchema);