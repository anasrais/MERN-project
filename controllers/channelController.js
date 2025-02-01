const Channel = require('../models/Channel');
const Video = require('../models/Video');

const getChannelDetails = async (req, res) => {
    try {
        const channel = await Channel.findOne({ owner: req.params.id }).populate('videos');
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }
        res.json(channel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getChannelDetails };
