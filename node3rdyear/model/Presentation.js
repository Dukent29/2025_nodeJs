const mongoose = require('mongoose');
const { Article } = require('./article');

const presentationSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    Article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    Date: { type: Date, default: Date.now }
});

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation