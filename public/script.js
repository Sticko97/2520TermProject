// Handle login
function redirectToReminders() {
    // Redirect to the reminders page
    window.location.href = "ReminderPage.html";
}
function redirectToLogin() {
    // Redirect to the login page
    window.location.href = "SignInPage.html";
}
function displayReminders(reminders) {
    const allReminders = document.getElementById('all-reminders');
    allReminders.innerHTML = '';

    for (const reminder of reminders) {
        const reminderElement = document.createElement('div');
        reminderElement.innerHTML = `
            <h3>${reminder.title}</h3>
            <p>Date: ${reminder.date} Time: ${reminder.time}</p>
            <p>Tags: ${reminder.tags ? reminder.tags.join(', ') : ''}</p>
            <button onclick="deleteReminderById(${reminder.id})">Delete</button>
        `;
        allReminders.appendChild(reminderElement);
    }
}

function displayFriendsReminders(friendReminders) {
    const friendsRemindersDiv = document.getElementById('friends-reminders');
    friendsRemindersDiv.innerHTML = '';

    for (const reminder of friendReminders) {
        const reminderElement = document.createElement('div');
        reminderElement.innerHTML = `
      <h3>${reminder.title} (${reminder.userName})</h3>
      <p>Date: ${reminder.date} Time: ${reminder.time}</p>
      <p>Tags: ${reminder.tags.join(', ')}</p>
    `;
        friendsRemindersDiv.appendChild(reminderElement);
    }
}

function handleCreateReminder() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please log in to create a reminder');
        return;
    }

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tags = document.getElementById('tags').value.split(',');

    const reminder = createReminder(
        currentUser.id,
        title,
        date,
        time,
        tags
    );

    displayReminders(findRemindersByUser(currentUser.id));
}

function deleteReminderById(id) {
    const currentUser = getCurrentUser();
    const reminder = findReminderById(id);

    if (reminder && reminder.user === currentUser.id) {
        if (deleteReminder(id)) {
            alert('Reminder deleted successfully');
            displayReminders(findRemindersByUser(currentUser.id));
        } else {
            alert('Error deleting reminder');
        }
    } else {
        alert('You can only delete your own reminders');
    }
}



function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = login(email, password);

    if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
        redirectToReminders();
    } else {
        alert('Invalid email or password');
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    const user = register(email, password, name);

    if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
        redirectToReminders();
    } else {
        alert('Registration failed');
    }
}
function handleAddFriend() {
    const currentUser = getCurrentUser();
    const friendEmail = document.getElementById('username').value;

    if (addFriend(currentUser.id, friendEmail)) {
        alert('Friend added successfully');
        showReminders(); // Add this line to update the reminders display
    } else {
        alert('Error adding friend');
    }
}



function searchUserByEmail() {
    const email = document.getElementById('username').value;
    const user = findUserByEmail(email);

    if (user) {
        const resultDiv = document.getElementById('search-result');
        resultDiv.innerHTML = `
      <p>User Found: ${user.name}</p>
      <button onclick="handleAddFriend()">Add Friend</button>
    `;
    } else {
        alert('No user found with this email');
    }
}
function findFriendsByIds(ids) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.filter(user => ids.includes(user.id));
}

// Function to show reminders
function showReminders() {
    const currentUser = getCurrentUser();
    const reminders = findRemindersByUser(currentUser.id);

    let friendReminders = [];
    if (currentUser.friends && currentUser.friends.length > 0) {
        const friends = findFriendsByIds(currentUser.friends);
        friends.forEach(friend => {
            const friendReminderList = findRemindersByUser(friend.id);
            friendReminderList.forEach(reminder => {
                reminder.userName = friend.name;
            });
            friendReminders.push(...friendReminderList);
        });
    }

    displayReminders(reminders);
    displayFriendsReminders(friendReminders);
}
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = getCurrentUser();
    if (currentUser) {
        displayReminders(findRemindersByUser(currentUser.id));
    }
    showReminders();
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    const loginbutton = document.getElementById('login');
    if (loginbutton) {
        loginbutton.addEventListener('click', redirectToLogin);
    }
    const userSearchForm = document.getElementById('user-search-form');
    if (userSearchForm) {
        userSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            searchUserByEmail();
        });
    }
    showReminders();
});