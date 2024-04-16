const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Post', postSchema);
