const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' }]
});

userSchema.methods.hashPassword = function() {
    this.password = bcrypt.hashSync(this.password, 10);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
