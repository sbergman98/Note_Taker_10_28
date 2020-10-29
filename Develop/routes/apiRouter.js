const fs = require('fs');
const express = require('express');
const router = express.Router();

// turns text notes into JS object
const notes = JSON.parse(fs.readFileSync('./db/db.json'));

// function gets notes
router.get('/', function(req, res, next) {
  console.log({ notes });
  res.json(notes);
});

//Pushes new note to array and then rewrites as a string
router.post('/', function(req, res, next) {
  console.log(req.body);
  notes.push({
    title: req.body.title, 
    text: req.body.text,
    //generates random ID number
    id: Math.floor(Math.random() * 1000000),
  });
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.status(201).send(JSON.stringify(notes));
});

//deletes note
router.delete('/:id', function(req, res, next) {
  notes.forEach((note, i) => {
    if (note.id === parseInt(req.params.id)) {
      notes.splice(i, 1);
    }
  });
  //rewrites file without deleted note
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.status(201).send(JSON.stringify(notes));
});

console.log(notes)

module.exports = router;