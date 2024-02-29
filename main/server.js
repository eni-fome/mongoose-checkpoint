// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const personRoutes = require('./routes/personRoutes')

const app = express();

app.use(express.json());

app.use('/api/people', personRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
