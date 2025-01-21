const Presentation = require('../model/Presentation');

const findAll = async (req, res, next) => {
    try {
        const presentations = await Presentation.find({}).populate('article').exec();
        res.status(200).json(presentations);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const newPresentation = new Presentation(req.body);
        const presentation = await newPresentation.save();
        res.status(201).json(presentation);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    findAll,
    create
};