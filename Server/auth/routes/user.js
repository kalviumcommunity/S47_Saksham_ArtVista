const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const UserModel = require('../models.js/User')

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    const user = User.find({email})
    if (user) {
        return res.json({message: 'User already exists'})
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel.User({
        username, 
        email, 
        password: hashpassword
    })

    await newUser.save()
    return res.json({message: 'User created'})
})

module.exports = router;