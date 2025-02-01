const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const videoRoutes = require('./routes/videoRoutes');

app.use('/api/videos', videoRoutes);

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
