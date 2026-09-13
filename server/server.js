// Name: Jared Ramirez
// Description: This is my first server file

require('dotenv').config();
// loads variables from private .env file so my URI works

const express = require('express');
// require('express') will load the Express Library I installed express(web server framework),
// mongoose(eases communication to MongoDB), cors(lets React app port talk to Express server port),
// dotenv(seperate file where I can upload private info. rather than into my code)

const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();

app.use(cors());
// This tells Express "allow requests from other origins."
// CORS is a security rule that uses the app to stop the react app on a seperate port,
// from communicating with our server on a different port.

app.use(express.json());
// this lets Express comprehend JSON data sent in request bodies. This line
// prevents req.body from being undefined and prevent POST route from breaking.

// the following will enable me to connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/api/transactions', transactionRoutes);
// KEY LINE - any request starting with /api/transactions should be handled
// by the router that I built.
// Ex1: transactions.js, router.get('/') --> GET /api/transactions
// Ex2: router.put('/:id') --> PUT /api/transactions/:id

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// redeploy trigger
