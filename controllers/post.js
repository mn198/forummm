const PostModel = require('../models/post');
const ThreadModel = require('../models/thread');

const create = (req, res) => {
    // ** validate data
    var data = {
        userId: req.body.userId,
        content: req.body.content,
        threadId: req.body.threadId
    }
    
    PostModel.create(data)
    .then((post) => {
        ThreadModel.Thread.findByIdAndUpdate(post.threadId, { $push: { posts: post._id}}, {new: true}, (err, updatedThr) => {
            if(err) res.status(403).send(err)
            res.status(200).send(updatedThr);
        })
    })
    .catch(err => {
        console.log(err)
        res.status(406).send(err)
    });
}

const like = (req, res) => {
    PostModel.like(req.body.postId, req.body.userId)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(403).send(err))
}

module.exports = {
    create,
    like
}