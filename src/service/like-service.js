import { LikeRepository, TweetRepository } from '../repository/index.js'

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        if(modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId);
        }
        else if(modelType == 'Comment') {
            // Todo
        }
        else {
            throw new Error('Invalid model type');
        }

        const existingLike = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if(existingLike) {
            // unlike
            likeable.likes.pull(existingLike.id);
            await likeable.save();
            await this.likeRepository.destroy(existingLike.id);
            var isAdded = false;
        }
        else {
            // like
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });

            likeable.likes.push(newLike.id);
            await likeable.save();
            var isAdded = true;
        }
        return isAdded;
    }
}

export default LikeService;