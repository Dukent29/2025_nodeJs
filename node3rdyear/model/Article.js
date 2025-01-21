const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

const findAll = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(articles);
        }
    });
};

module.exports = {
    Article,
    findAll
};