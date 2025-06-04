import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        // Fetch the content of the tweet and extract hashtags
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
        tags = tags.map((tag) => tag.substring(1).toLowerCase());
        
        // separate the tags that are already present in the database and the new tags
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title);
        
        // Filter out the tags that are already present in the database
        let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));
        newTags = newTags.map((tag) => {
            return { title: tag, tweets: [tweet.id] };
        });

        // Create new tags in the database and add the tweet ID to the existing tags
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;