const express = require('express');
const { getChannelDetails } = require('../controllers/channelController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', protect, getChannelDetails);

module.exports = router;
