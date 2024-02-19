/*const express = require('express');
import fetch from 'axios';
//const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000; // Use a port of your choice

app.use(express.json());
// Add middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
    console.log(`CORS set`);
    next();
});

app.post('/proxy', async (req, res) => {
    const url = 'https://script.google.com/macros/s/AKfycbyHGV1vSmR7z036i_R4-6w6kJpiqnhchbToAO9ChdX4MVfTIOyNX6NHN3Q3iJ0ujKjd/exec';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/

// Import Axios
const axios = require('axios');

// Example URL
const url = 'https://script.google.com/macros/s/  AKfycbyHGV1vSmR7z036i_R4-6w6kJpiqnhchbToAO9ChdX4MVfTIOyNX6NHN3Q3iJ0ujKjd/exec';

// Example data to send in the request
const postData = {
  key: 'value'
};

// Make a POST request using Axios
axios.post(url, postData, {
    headers: {
      'Content-Type': 'application/json'
    }
})
.then(response => {
    // Handle the response data
    console.log(response.data);
})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

