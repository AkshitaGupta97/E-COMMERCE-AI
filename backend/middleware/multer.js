import multer from "multer";
import path from "path";

// storage configuration
const stroage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // folder where files will be stored
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: stroage });

export default upload;
