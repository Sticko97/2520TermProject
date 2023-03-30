function findReminderById(id) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    return reminders.find(reminder => reminder.id === id);
}

function findRemindersByUser(userId) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    return reminders.filter(reminder => reminder.user === userId);
}

function createReminder(userId, title, description, date, time, tags) {
    const reminder = {
        id: Date.now(),
        user: userId,
        title,
        description,
        date,
        time,
        tags
    };

    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    console.log(reminder);
    return reminder;
}

// function updateReminder(id, updates) {
//     const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
//     const reminderIndex = reminders.findIndex(reminder => reminder.id === id);
//
//     if (reminderIndex > -1) {
//         const updatedReminder = { ...reminders[reminderIndex], ...updates };
//         reminders[reminderIndex] = updatedReminder;
//         localStorage.setItem('reminders', JSON.stringify(reminders));
//
//         return updatedReminder;
//     }
//
//     return null;
// }

function deleteReminder(id) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const reminderIndex = reminders.findIndex(reminder => reminder.id === id);

    if (reminderIndex > -1) {
        reminders.splice(reminderIndex, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));

        return true;
    }

    return false;
}