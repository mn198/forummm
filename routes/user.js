const UserController = require('../controllers/user');
const AuthorizationController = require('../controllers/authorization');

exports.routesConfig = (app) => {
    app.post('/signup', [
        UserController.hasValidField,
        UserController.create,
        AuthorizationController.login
    ])
}