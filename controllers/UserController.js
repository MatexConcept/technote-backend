const User = require('../models/User')
const Note = require('../models/Note')

const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// description Get all UserSelected
// routes Get/userSelected
// access private 

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select("-password").lean()
    if(!users?.length){
       return res.status(400).json({message: "No user found"})
    }

    res.json(users)
})

// description create new user
// routes POST/user
// access private 

const createNewUser = asyncHandler(async (req, res) => {

    const {username, password, roles} = req.body;

    // confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length)
        return res.status(400).json({message : "All fields are required"})
    

    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate)
       return res.status(409).json({message: "user already exist"})
    
  
    // hashd password

    const hashpwd = await bcrypt.hash(password, 10) // salt rounds
    const user = await User.create({username, password: hashpwd, roles})

      // create and store user
    
  
    
    if(user){
        res.status(201).json({message : `New User ${username} is created successfully ` })
    }else{
        res.status(400).json({message: "invalid user data recieved"})
    }

})

// description update a user
// routes Patch user
// access private 

const updateUser = asyncHandler(async(req, res) => {
    const {id, username, roles, active, password} = req.body

    // confirm data
    if(!id || !username || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'all field are required'})
    }

    const user = await User.findById(id).exec()
    if(!user){
        return res.status(404).json({message: "user not found"})
    }

    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate && duplicate?._id.toString() !==id){
        return res.status(409).json({message: "Duplicate Username"})
    }
    user.username = username
    user.roles = roles
    user.active = active
    if(password){
        user.password = await bcrypt.hash(password, 10)
    }

    const updateUser = await user.save()
    res.json({message: `${updateUser.username} updated successfully`})
});

// description delete a user
// routes delete user
// access private 


const deleteUser = asyncHandler(async(req, res) => {
    const { id } = req.body;

  //confirm
  if (!id) return res.status(400).json({ message: "User's ID is required" });

  // Does the user still have assigned notes?
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) res.status(400).json({ message: "User has notes assigned" });

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User Not Found" });

  const deletedUser = await user.deleteOne();

  const reply = `User ${deletedUser.username} with ID ${deletedUser._id} has been deleted`;
  res.status(200).json(reply);
})

module.exports = {getAllUsers, createNewUser, updateUser, deleteUser}