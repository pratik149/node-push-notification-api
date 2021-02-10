// Imports
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')

// Import API Routes
const notificationRoutes = require('./routes/web/index');

// Create an instance of express app
const app = express()
// Set port
const port = process.env.PORT || '3000'

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('[STATUS] Connected to Database'))

// Register API Routes
app.use('/notification', notificationRoutes);

// Listen app on given port
app.listen(port, () => {
	console.info(`[STATUS] App listening on port ${port}`)
})