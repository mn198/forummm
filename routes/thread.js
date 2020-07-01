const ThreadController = require('../controllers/thread');

exports.routesConfig = (app) => {
    app.post('/t', [
        ThreadController.create        
    ])
    
    app.get('/t', [
        ThreadController.list
    ])

    app.get('/t/:slug/:id', [
        ThreadController.get
    ])
}