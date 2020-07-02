const ThreadController = require('../controllers/thread');
const ValidationMiddleware = require('../common/middlewares/authValidation');

exports.routesConfig = (app) => {
    app.post('/t', [
        ValidationMiddleware.validJWTNeeded,
        ThreadController.create        
    ])
    
    app.get('/t', [
        ThreadController.list
    ])

    app.get('/t/:slug/:id', [
        ThreadController.read
    ])

    app.post('/t/:slug/:id/like', [
        ThreadController.like
    ])
}