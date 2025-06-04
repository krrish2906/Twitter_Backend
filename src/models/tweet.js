import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet content cannot exceed 250 characters']
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', TweetSchema);
export default Tweet;