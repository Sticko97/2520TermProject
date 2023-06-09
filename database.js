const mongoose = require('mongoose');
const User = require('./user');
const Reminder = require('./reminder');

mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB database');
});

function findUserByEmail(email, callback) {
    User.findOne({ email: email }, callback);
}

function createUser(email, password, name, callback) {
    const user = new User({ email, password, name });
    user.hashPassword();
    user.save(callback);
}

function findReminderById(id, callback) {
    Reminder.findById(id, callback);
}

function findRemindersByUser(userId, callback) {
    Reminder.find({ user: userId }, callback);
}

function createReminder(userId, title, description, date, time, tags, callback) {
    const reminder = new Reminder({ title, description, user: userId, date, time, tags });
    reminder.save(callback);
}

function updateReminder(id, updates, callback) {
    Reminder.findByIdAndUpdate(id, updates, { new: true }, callback);
}

function deleteReminder(id, callback) {
    Reminder.findByIdAndDelete(id, callback);
}

module.exports = {
    findUserByEmail,
    createUser,
    findReminderById,
    findRemindersByUser,
    createReminder,
    updateReminder,
    deleteReminder
};
