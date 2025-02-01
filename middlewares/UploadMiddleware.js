const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Filter for allowed file types (images/videos)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max file size
});

module.exports = upload;
