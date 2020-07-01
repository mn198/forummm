const CategoryController = require('../controllers/category');

exports.routesConfig = (app) => {
    app.get('/c', [
        CategoryController.list
    ])
}