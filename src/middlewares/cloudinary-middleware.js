import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary-config.js";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "twitter",
        public_id: (req, file) => {
            return "tweet_" + Date.now()
        }
    }
});

const upload = multer({ storage });
export default upload;