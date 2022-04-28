// path and router items needed
const { route } = require('express/lib/application');
const path = require('path');
const router = require('express').Router();

// need to add router.get functionality for each of the html pages
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// export the routes
module.exports = router;