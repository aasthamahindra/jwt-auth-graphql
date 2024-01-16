const mongoose = require('mongoose');
const { connection } = require('../db/mongodb');

const userData = new mongoose.Schema({
    name: String,
    email: String,
});

const model = connection.model('users', userData);

module.exports = {
    model
}