const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware for parsing JSON 
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static('public'));


//Attached notes.html

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);


//Get API

app.get('/api/notes', (req, res) => {
    try {
        let data = fs.readFileSync('./db/db.json', 'utf8');

    res.json(JSON.parse(data));

    }catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    
    
    
});

//Post API

app.post('/api/notes', (req, res) => {
    const newNote = {
        ...req.body,
        id: uuidv4(),
    };
    try {
        let data = fs.readFileSync('./db/db.json', 'utf8');
         const dataJSON = JSON.parse(data);

         dataJSON.push(newNote);

         fs.writeFile('./db/db.json', JSON.stringify(dataJSON, null, 2), (err) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');

         }
         res.status(201).json(newNote);

        });
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }

});

//Attach index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);


app.listen(PORT, () => 
console.log(`Server listening on port ${PORT}`));

