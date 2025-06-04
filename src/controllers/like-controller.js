import { LikeService } from '../service/index.js'
const likeService = new LikeService();

const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(
            req.query.modelId,
            req.query.modelType,
            req.user.id
        );
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully toggled the like',
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
    toggleLike
}