import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/serverconfig.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const SALT = bcrypt.genSaltSync(10);
    const user = this;
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function generateJWT() {
    return jwt.sign({ id: this._id, email: this.email }, config.SECRET_KEY, {
        expiresIn: '1h'
    });
}

const User = mongoose.model("User", userSchema);
export default User;