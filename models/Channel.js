const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
});

module.exports = mongoose.model('Channel', channelSchema);
