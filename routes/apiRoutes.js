// require router and db items needed
const { route } = require('express/lib/application');
const router = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
// const db = require('../db/db.json');

// set up get/post/delete methods as responses to the database
// get route for specific note
router.get('/:note_id', (req, res) => {
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
router.post('/', (req, res) => {
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

// export to the router
module.exports = router;