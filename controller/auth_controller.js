function findUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

function register(email, password, name) {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
        return null;
    }

    const user = { id: Date.now(), email, password, name };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return user;
}

function login(email, password) {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function addFriend(currentUserId, friendEmail) {
    const currentUser = JSON.parse(localStorage.getItem('users')).find(user => user.id === currentUserId);
    const friend = findUserByEmail(friendEmail);

    if (!currentUser || !friend) {
        return false;
    }

    currentUser.friends = currentUser.friends || [];
    if (!currentUser.friends.includes(friend.id)) {
        currentUser.friends.push(friend.id);
        updateUsersStorage();
        return true;
    }

    return false;
}

function updateUsersStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify(users));
}