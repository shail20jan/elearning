const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    shortName: {
        type: String,
        required: true,
        unique:true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Type', typeSchema);
