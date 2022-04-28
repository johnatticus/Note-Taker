// require the util and fs needed
const util = require('util');
const fs = require('fs');

// require the uuid/v1 package in your package.json
const uuidv1 = require('uuid/v1');

// write to file

// read to file

// get notes
tips.get('/:note_id', (req, res) => {
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

module.exports = notes