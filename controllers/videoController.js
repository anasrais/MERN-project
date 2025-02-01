const Video = require('../models/Video');

// Add a new video
const addVideo = async (req, res) => {
    const { title, description, thumbnailUrl, videoUrl, channelId } = req.body;

    try {
        const video = await Video.create({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            channelId,
            uploader: req.user._id,
        });
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('uploader', 'username').populate('channelId', 'channelName');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a video by ID
const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('uploader', 'username').populate('channelId', 'channelName');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a video
const updateVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Check if the user is the uploader or admin
        if (video.uploader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this video' });
        }

        // Update video details
        video.title = req.body.title || video.title;
        video.description = req.body.description || video.description;
        video.thumbnailUrl = req.body.thumbnailUrl || video.thumbnailUrl;
        video.videoUrl = req.body.videoUrl || video.videoUrl;

        const updatedVideo = await video.save();
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a video
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Ensure only the uploader can delete the video
        if (video.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this video' });
        }

        await video.remove();
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Add a comment
const addComment = async (req, res) => {
    const { text } = req.body;

    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const newComment = {
            user: req.user._id,
            text,
        };

        video.comments.push(newComment);
        await video.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const uploadVideo = async (req, res) => {
    const { title, description, thumbnailUrl, videoUrl, channelId } = req.body;

    try {
        // Create a new video
        const video = await Video.create({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            channelId,
            uploader: req.user._id,
        });

        // Add the video to the channel
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }
        channel.videos.push(video._id);
        await channel.save();

        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVideosByChannel = async (req, res) => {
    try {
        const videos = await Video.find({ channelId: req.params.id }).populate('uploader', 'username');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { addVideo, addComment, getVideos, getVideosByChannel, getVideoById, updateVideo, deleteVideo };

