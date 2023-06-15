const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController')
const verifyJWT = require('../middleware/verifyJwt')

router.use(verifyJWT)

router.route('/')
.get(controller.getAllUsers)
.post(controller.createNewUser)
.patch(controller.updateUser)
.delete(controller.deleteUser)


module.exports = router;