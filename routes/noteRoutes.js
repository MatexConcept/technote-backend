const express = require('express');
const router = express.Router();

const controllers = require('../controllers/NoteController')

const verifyJWT = require('../middleware/verifyJwt')

router.use(verifyJWT)

router.route('/')
.get(controllers.getAllNotes)
.post(controllers.createNewNote)
.patch(controllers.updateNote)
.delete(controllers.deleteNote)

module.exports = router;