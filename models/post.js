const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: { type: String },
    likeCount: { type: Number, default: 0 },
    editCount: { type: Number, default: 0 },
    removed: { type: Boolean, default: false },
    replyTo: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    thread: { type: Schema.Types.ObjectId, ref: 'thread'}
}, { timestamps: true })

const Post = mongoose.model('post', PostSchema);

const create = (postData) => {
    var p = new Post(postData);
    return p.save();
}

const update = (postId, postData) => {
    return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(postId, postData, (err, updatedPost) => {
            if(err) reject(err);
            resolve(updatedPost);
        })
    })
}

const remove = (postId) => {
    return new Promise((resolve, reject) => {
        Post.findByIdAndUpdate(postId, { removed: true }, (err, res) => {
            if(err) reject(err)
            resolve(res);
        })
    })
}

module.exports = {
    create,
    update,
    remove
}