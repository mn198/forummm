const CategoryModel = require('../models/category');

const list = (req, res) => {
    CategoryModel.list()
    .then(result => res.status(200).send(JSON.stringify(result)))
    .catch(err => {
        res.status(403).send(err)
        console.log(err)
    });
}

module.exports = {
    list
}