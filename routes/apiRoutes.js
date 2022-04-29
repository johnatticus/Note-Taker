// require router and db items needed
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// set up get/post/delete methods as responses to the database

// GET Route for retrieving all notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// get route for specific note
notes.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('There are no notes with that ID');
      });
  });

// DELETE Route for a specific tip
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((notes) => {
        console.log(req.params.id);
        // console.log(notes);
        // Make a new array of all tips except the one with the ID provided in the URL
        notes.filter((note) => note.id !== noteId);
      })
      .then((filteredNotes) => {
        console.log(filteredNotes);
        filteredNotes = JSON.stringify(filteredNotes);
        // Save that array to the filesystem
        writeToFile('./db/db.json', filteredNotes);
      })
        // Respond to the DELETE request
        res.json(`${noteId} has been deleted`);
  });

// post route for new note
notes.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added`);
    } else {
      res.error('ERROR: Could not add note. sad!');
    }
  });

// export to the router
module.exports = notes;