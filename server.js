const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'test2.softtouch.eu',
  user: 'DS3N-TnSoJCSfB',
  password: 'NN_b-A4iCE8NgcKPjm70',
  database: 'mavenfuzzyfactory'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  // Here you can perform any necessary database queries
  // and then serve your index.html file
  console.log("test", req)
  res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res) => {
    const query = 'SELECT * FROM test';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Error fetching data from database');
        return;
      }
  
      // Send the query results to the client
      res.send(results);
      console.log(results);  
    });
});

app.get('/getUser', (req, res) => {
    const querySel = 'SELECT * FROM users ORDER BY UserID DESC LIMIT 1';
    connection.query(querySel, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Error fetching data from database');
        return;
      }
  
      // Send the query results to the client
      res.send(results);
    });
});

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Endpoint to handle POST requests for inserting data
app.post('/insert', (req, res) => {
  const { SwitchID, BonTijd, UserID } = req.body; // Assuming you're sending 'name' and 'age' in the request body

  // Perform the database query
  const query = 'INSERT INTO timer (SwitchID, BonTijd, UserID) VALUES (?, ?, ?)';
  connection.query(query, [SwitchID, BonTijd, UserID], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error inserting data into database');
      return;
    }

    res.send('Data inserted successfully');
  });
});

app.post('/insertuser', (req, res) => {
    const { UserName } = req.body; // Assuming you're sending 'name' and 'age' in the request body
  
    // Perform the database query
    const query = 'INSERT INTO users (UserName) VALUES (?)';
    connection.query(query, [UserName], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Error inserting data into database');
        return;
      }
      res.send('Data inserted successfully');
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});