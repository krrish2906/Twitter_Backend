import passport from "passport";

export const authenticate = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if(err) next(err);
        if(!user) {
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Unauthorized Access Invalid Token',
                error: {}
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}