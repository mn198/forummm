const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String , unique: true },
    color: { type: String }
})

const Category = mongoose.model('category', CategorySchema);

const create = (catData) => {
    var c = new Category(catData);
    c.save();
}

const list = () => {
    return new Promise((resolve, reject) => {
        Category.find()
        .exec((err, cats) => {
            if(err) reject(err);
            resolve(cats);
        })
    })
}

module.exports = {
    Category,
    create,
    list
}