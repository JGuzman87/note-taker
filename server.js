const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index')

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware for parsing JSON 
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static('public'));

app.use('/api', api);

//Attach html

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

//Get api's

app.get('api/notes', (req, res) => {
    console.info(`${req.method} request received from notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Post api's

// app.post('api/notes', (req, res) => {

// })



app.listen(PORT, () => 
console.log(`Server listening on port ${PORT}`));

