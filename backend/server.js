const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.get('/', (req, res) => res.json({ status: 'ok', service: 'Travel Discovery Platform API' }));
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Alias routes to match user expectations
app.use('/', apiRoutes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


