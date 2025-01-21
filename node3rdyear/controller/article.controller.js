const Article = require('../model/article');

exports.findAll = async (req, res) => {
    let articles = await Article.find();
    res.json(articles);
}