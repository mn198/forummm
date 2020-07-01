const mongoose = require('mongoose');
const UserModel = require('./user').User;
const CategoryModel = require('./category').Category;
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true },
    published: { type: Boolean, default: false },
    removed: { type: Boolean, default: false},
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'post'}],
    likes: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    category: { type: Schema.Types.ObjectId, ref: 'category'}
}, { timestamps: true })

const Thread = mongoose.model('thread', ThreadSchema);

const list = () => {
    return new Promise((resolve, reject) => {
        Thread.find()
        .select('-content -published -removed')
        .populate({ path: 'author', select: 'username -_id'})
        .populate({ path: 'category', select: 'name color -_id'})
        .sort('-createdAt')
        .exec((err, threads) => {
            if(err) reject(err);
            resolve(threads)
        })
    })
}

const get = (slug, threadId) => {
    return new Promise((resolve, reject) => {
        Thread.findOne({slug: slug, _id: threadId})
        .select('-published -removed')
        .populate({ path: 'author', select: 'username -_id'})
        .populate({ path: 'category', select: 'name color -_id'})
        .exec((err, thread) => {
            if(err) reject(err);
            resolve(thread)
        })
    })
}

const create = (threadData) => {
    var thr = new Thread(threadData);
    return thr.save();
}

const read = (threadId) => {
    return new Promise((resolve, reject) => {
        Thread.findById(threadId, (err, thread) => {
            if(err) reject(err);
            resolve(thread);
        })
    })
}


const update = (threadId, threadData) => {
    return new Promise((resolve, reject) => {
        Thread.findByIdAndUpdate(threadId, threadData, (err, updatedThread) => {
            if(err) reject(err);
            resolve(updatedThread);
        })
    })
}

const remove = (threadId) => {
    return new Promise((resolve, reject) => {
        Thread.findByIdAndUpdate(threadId, {removed: true}, (err, updatedThread) => {
            if(err) reject(err);
            resolve(updatedThread);
        })
    })
}

const like = (threadId, userId) => {
    return new Promise((resolve, reject) => {
        Thread.findByIdAndUpdate(threadId, { $push: {likes: userId}}, (err, updatedThread) => {
            if(err) reject(err);
            resolve(updatedThread);
        })
    })
}

const unlike = (threadId, userId) => {
    return new Promise((resolve, reject) => {
        Thread.findByIdAndUpdate(threadId, { $pull: {likes: userId}}, (err, updatedThread) => {
            if(err) reject(err);
            resolve(updatedThread);
        })
    })
}

module.exports = {
    list,
    get,
    create,
    read,
    update,
    remove,
    like,
    unlike
};