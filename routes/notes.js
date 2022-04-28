// require the util and fs needed
const util = require('util');
const fs = require('fs');
const notes = require('express').Router();

// require the uuid/v1 package in your package.json
const uuidv1 = require('uuid');

// get route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// get route for specific note
notes.get('/:note_id', (req, res) => {
    const tipId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('There are no notes with that ID');
      });
  });

// post route for new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv1(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('ERROR: Could not add note. sad!');
    }
  });

module.exports = notes