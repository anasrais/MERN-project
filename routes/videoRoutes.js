const express = require('express');
const { addVideo, getVideos, getVideoById, updateVideo, deleteVideo, addComment} = require('../controllers/videoController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadVideo } = require('../controllers/videoController');
const { checkRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Create a new video
router.post('/', protect, addVideo);

// Fetch all videos
router.get('/', getVideos);

// Fetch a single video by ID
router.get('/:id', getVideoById);

// Update a video
router.put('/:id', protect, updateVideo);

// Delete a video
router.delete('/:id', protect, deleteVideo);

// Add Comment
router.post('/:id/comments', protect, addComment);

// Upload a video
router.post('/upload', protect, uploadVideo);

// Update video details (Uploader or Admin only)
router.put('/:id', protect, checkRole('user', 'admin'), updateVideo);

// Delete video (Uploader or Admin only)
router.delete('/:id', protect, checkRole('user', 'admin'), deleteVideo);

// Upload a thumbnail
router.post('/upload-thumbnail', protect, upload.single('thumbnail'), (req, res) => {
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

// Upload a video file
router.post('/upload-video', protect, upload.single('video'), (req, res) => {
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;


