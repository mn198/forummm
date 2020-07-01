const UserModel = require('../models/user');

const create = (req, res, next) => {
    var data = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    }

    UserModel.create(data)
    .then(result => {
        req.body = {
            userId: result._id,
            username: result.username
        }
        return next();
    })
    .catch(err => res.status(403).send(err))
}

const hasValidField = (req, res, next) => {
    var errors = []

    if(req.body && req.body.username){
        UserModel.User.find({username: req.body.username})
        .then((result) => {
            if(result.length > 0)
                errors.push('Username is duplicated')
            if(!req.body.email)
                errors.push('Missing email field');
            if(req.body.password < 5)
                errors.push('Password is at least 6 characters')
            if(errors.length)
                return res.status(200).send({errors: errors.join(', ')});
            else
                return next()
        })
    } else {
        return res.status(200).send({errors: 'Missing some fields'});
    }
}

module.exports = {
    create,
    hasValidField
}