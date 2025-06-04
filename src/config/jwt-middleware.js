import JWT from 'passport-jwt';
import { config } from './serverconfig.js'
import { User } from '../models/index.js';

const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_KEY,
}

export const passportAuth = (passport) => {
    passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if(!user) {
            done(null, false);
        } else {
            done(null, user);
        }
    }));
}