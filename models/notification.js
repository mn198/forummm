const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    read: { type: Boolean, required: true, default: false },
    removed: { type: Boolean, default: false },
    type: { type: String, enum: ['mention', 'thread update', 'reply']},
    from: { type: Schema.Types.ObjectId, ref: 'user' },
    to: { type: Schema.Types.ObjectId, ref: 'user' },
    thread: { type: Schema.Types.ObjectId, ref: 'thread'}
}, { timestamps: true });

const Notification = mongoose.model('notification', NotificationSchema);