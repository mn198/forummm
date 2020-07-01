//const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

const ThreadRouter = require('./routes/thread');
const CategoryRouter = require('./routes/category');
const AuthorizationRouter = require('./routes/authorization');
const UserRouter = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://mn198:mmn198@ds115166.mlab.com:15166/forum', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('connected to database'))
.catch(err => console.log(`can't connect to database ${err}`))

ThreadRouter.routesConfig(app);
CategoryRouter.routesConfig(app);
AuthorizationRouter.routesConfig(app);
UserRouter.routesConfig(app);

var port = 8080;
app.listen(process.env.port || port, () => {
    console.log(`app is listening on port ${port}`)
})