// require router, uuid, and fsUtils
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

// GET route for specific note when clicked
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

// DELETE route for a specific tip when the trash can icon is clicked
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    // console.log(noteId);
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips EXCEPT the one that is selected to be deleted
      const result = json.filter((note) => note.id !== noteId);
      // console.log(result)

      // save the new array to the filesystem
      writeToFile('./db/db.json', result);
      })
        // Respond to the DELETE request...this doesn't work?
        res.json(`${noteId} has been deleted`);
  });

// POST route for new note
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