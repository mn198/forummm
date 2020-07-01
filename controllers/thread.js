const ThreadModel = require('../models/thread');
var slugify = require('slugify');

const list = (req, res) => {
    ThreadModel.list()
    .then(result => res.status(200).send(JSON.stringify(result)))
    .catch((err) => {
        res.status(403).send(JSON.stringify(err));
        console.log(err);
    });
    
}

const get = (req, res) => {
    ThreadModel.get(req.params.slug, req.params.id)
    .then(result => res.status(200).send(JSON.stringify(result)))
    .catch((err) => {
        res.status(403).send(JSON.stringify(err));
        console.log(err);
    });
}

const create = (req, res) => {
    ThreadModel.create({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        slug: 
        slugify(req.body.title, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
          }),
        category: req.body.category
    })
    .then(result => res.status(200).send(JSON.stringify(result)))
    .catch(err => {
        res.status(200).send({errors: 'Missing some fields'})
        console.log(err)
    });
}

module.exports = {
    create,
    list,
    get
}