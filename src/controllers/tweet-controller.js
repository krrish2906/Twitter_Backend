import { TweetService } from '../service/index.js'
import upload from "../middlewares/cloudinary-middleware.js"

const tweetService = new TweetService();
const singleUploader = upload.single("image");

const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function (error, data) {
            if(error) {
                return res.status(500).json({
                    error: error.message
                })
            }

            const payload = { ...req.body };
            if(req.file) {
                payload.image = req.file.path;
            }

            const tweet = await tweetService.create(payload);
            return res.status(201).json({
                data: tweet,
                success: true,
                message: 'Successfully created a tweet',
                error: {}
            });
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

const getTweet = async (req, res) => {
    try {
        const tweet = await tweetService.get(req.params.tweetId);
        return res.status(200).json({
            data: tweet,
            success: true,
            message: 'Successfully fetched the tweet',
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export {
    createTweet,
    getTweet
}