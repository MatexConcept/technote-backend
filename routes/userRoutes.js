const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController')

router.route('/')
.get(controller.getAllUsers)
.post(controller.createNewUser)
.patch(controller.updateUser)
.delete(controller.deleteUser)


module.exports = router;