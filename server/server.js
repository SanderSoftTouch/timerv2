/*const fs = require('fs');

// Path to the JSON file
const filePathLog = 'log.json';
const filePathUser = 'user.json';

function PostData(){
    // Fetch data from JSON file
    fs.readFile(filePathUser, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
    
      let jsonData = [];
      try {
        // Parse JSON data
        jsonData = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
      }
    
      // Modify data (add new data or update existing data)
      const newData = { id: 2, name: 'Jane Doe', age: 30 };
      jsonData.push(newData);
      //const updatedData = [jsonData, newData];
    
      // Convert updated data back to JSON format
      const updatedJsonData = JSON.stringify(jsonData, null, 2);
    
      // Write updated data back to the JSON file
      fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('Data successfully updated.');
      });
    });
}

export {PostData};*/

/*const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve JavaScript modules with correct MIME type
app.get('*.js', (req, res, next) => {
    res.set('Content-Type', 'application/javascript');
    next();
  });

// Define route to execute server.js
app.get('/execute', (req, res) => {
  exec('node server.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing server.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  res.send('Server.js executed successfully.');
});

app.get('/run-script', (req, res) => {
  // Execute your server.js script here
  console.log('Executing server.js...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT ||3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (optional)
app.use(express.static('public'));

// Read data from JSON file
app.get('/data', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
    console.log(JSON.parse(data));
  });
});

// Update data in JSON file
app.post('/data', (req, res) => {
  const newData = req.body;
  fs.writeFile('user.json', JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
      return;
    }
    res.send('Data updated successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

