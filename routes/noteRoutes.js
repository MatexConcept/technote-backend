const express = require('express');
const router = express.Router();

const controllers = require('../controllers/NoteController')

router.route('/')
.get(controllers.getAllNotes)
.post(controllers.createNewNote)
.patch(controllers.updateNote)
.delete(controllers.deleteNote)

module.exports = router;