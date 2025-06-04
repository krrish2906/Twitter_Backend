import { CommentService } from '../service/index.js'
const commentService = new CommentService();

const createComment = async (req, res) => {
    try {
        const response = await commentService.create(
            req.query.modelId,
            req.query.modelType,
            req.user.id,
            req.body.content
        );
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully added a comment',
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
    createComment
}