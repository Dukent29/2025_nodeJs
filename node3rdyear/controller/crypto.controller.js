const Crypto = require('../model/Crypto');

const createCrypto = (req, res) => {
    const newCrypto = new Crypto({
        name: req.body.name,
        prix: req.body.prix,
        devise: req.body.devise
    });

    Crypto.create(newCrypto, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Crypto'
            });
        } else {
            res.send(data);
        }
    });
};

module.exports = {
    createCrypto
};
