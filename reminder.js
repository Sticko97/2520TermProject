const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    time: { type: String, required: true },
    tags: { type: String, required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
