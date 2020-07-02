const PostController = require('../controllers/post');
const ValidationMiddleware = require('../common/middlewares/authValidation');

exports.routesConfig = (app) => {
    app.post('/t/:slug/:threadId', [
        ValidationMiddleware.validJWTNeeded,
        PostController.create
    ])

    app.post('/t/:slug/:threadId/like/p', [
        ValidationMiddleware.validJWTNeeded,
        PostController.like
    ])
}