const express = require('express')
const dotenv = require('dotenv')
const Mongoose = require('mongoose')
const router = require('./routes/user')

dotenv.config()


const app = express()
app.use(express.json())
Mongoose.connect(process.env.MONGO_URL)

app.listen(process.env.PORT, () => {
    console.log('server started')
})