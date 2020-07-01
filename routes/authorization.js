const AuthorizationController = require('../controllers/authorization');

exports.routesConfig = function(app){
  app.post('/auth', [
  //  AuthorizationController.hasAuthValidFields,
    AuthorizationController.isPasswordAndUserMatch,
    AuthorizationController.login
  ])

}
