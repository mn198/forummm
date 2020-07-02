const User = require('./models/user');
const Thread = require('./models/thread');
const faker = require('faker');
const category = require('./models/category');

// const db = 'mongodb://mn198:mmn198@ds115166.mlab.com:15166/forum'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false})
.then(() => console.log('success'))
.catch((err) => console.log(err))

/*
for(var i = 0; i < 20; ++i){

    User.create({
        username: faker.name.findName(),
        password: '123',
        permission: 1
    })
    .then((result) => console.log('success'))
    .catch(err => console.log(err))
}
*/

// for(var i = 0; i < 5; ++i){
//     Thread.create({
//         title: faker.lorem.sentence(),
//         content: faker.lorem.paragraphs(),
//         slug: faker.lorem.slug(),
//         author: '5efa3125fa8aca096ce3c270',
//         category: '5efa34232a680d21f0bc5063',
//     })
// }


for(var i = 0; i < 5; i++){
    category.create({
        name: faker.lorem.word(),
        color: faker.commerce.color()
    })
}