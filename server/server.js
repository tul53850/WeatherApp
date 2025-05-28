const express = require('express'); //Run this file like 'node server.js' in another terminal
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const bodyParser = require('body-parser'); // JSON body parser
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./data.db');
db.serialize(() => {db.run("CREATE TABLE IF NOT EXISTS Strings (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)");});

app.listen(PORT, () =>{ //API routes here
    console.log(`Server Running on port ${PORT}`)
});

app.post('/api/save', (req, res) => {
    const {value} = req.body;
    //db.run("DELETE FROM Strings"); //replaces or updates value
    db.run("INSERT INTO Strings (value) VALUES (?)", [value], function(err) {
        if (err) return res.status(500).json({error: err.message});
        res.json({message: 'Data Saved! YAY'});
    });
});

app.get('/api/data', (req, res) => { //returns JSON response
    //const data = {message: 'test message mf'};
    //res.json(data);
    
    //db.get("SELECT value FROM Strings ORDER BY id DESC LIMIT 1", [], (err, row) => {
    //    if (err) return res.status(500).json({error: err.message});
    //    res.json({value: row?.value || 'Could not read data!! :('});
    //});   // replace or update value

    db.all("SELECT * FROM Strings ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({values: rows}); //rows = {id, value} pairs
    });
});