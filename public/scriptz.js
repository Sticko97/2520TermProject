class Reminder {
    constructor(id, title, date, time, tags = '') {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
        this.tags = tags.split(',').map(tag => tag.trim());
        this.subtasks = [];
    }
}

const createReminderForm = document.getElementById('create-reminder-form');
const allReminders = document.getElementById('all-reminders');
const subtaskForm = document.getElementById('subtask-form');
const userSearchForm = document.getElementById('user-search-form');
const userSearchResults = document.getElementById('user-search-results');

let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

function saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function displayReminders() {
    allReminders.innerHTML = '';
    reminders.forEach(reminder => {
        const reminderEl = document.createElement('div');
        reminderEl.classList.add('reminder');
        reminderEl.innerHTML = `
            <h3>${reminder.title}</h3>
            <p>Date: ${reminder.date}</p>
            <p>Time: ${reminder.time}</p>
            <p>Tags: ${reminder.tags.join(', ')}</p>
            <p>Subtasks: ${reminder.subtasks.join(', ')}</p>
            <button onclick="editReminder(${reminder.id})">Edit</button>
            <button onclick="deleteReminder(${reminder.id})">Delete</button>
        `;
        allReminders.appendChild(reminderEl);
    });
}
