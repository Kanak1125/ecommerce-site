const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql');
const PORT = 8000;

// database connection...
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected...");
})

// middleware function to allow the request from the client...
app.use(cors());

app.get('/api/home', (req, res) => {
    res.json({ message: "Hello world! "});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})