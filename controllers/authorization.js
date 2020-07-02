const secret = require('../common/config/env.config').jwt_secret;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user').User;

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');

        req.body.refresh_key = salt;

        let token = jwt.sign(req.body, secret);
        let b = new Buffer(hash);
        let refresh_token = b.toString('base64');

        res.status(201).send({ accessToken: token, refresh_token: refresh_token });
    } catch(err) {
        res.status(500).send({errors: 'invalid email or password'})
    }
}


exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.find({username: req.body.username})
        .then((user) => {
            if(!user[0]){
                return res.status(200).json({errors: 'Invalid email or password'});
            } else {
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

                if(hash === passwordFields[1]){
                    req.body = {
                        userId: user[0]._id,
                        username: user[0].name,
                    }

                    return next();
                } else {
                    return res.status(200).json({errors: 'Invalid email or password'})
                }
            }
        })
}

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
  
    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
  
        if (errors.length) {
            return res.status(200).send({errors: errors.join(', ')});
        } else {
            return next();
        }
    } else {
        return res.status(200).send({errors: 'Missing email and password fields'});
    }
  }