exports.users = []
exports.addUser = function(user) {
    // token = user + "-" + Math.random();
    token = user; //temp
    users.push(token);
}
exports.removeUser = function(token) {
    if (users.indexOf(token) >= 0)
        users.splice(users.indexOf(token), 1)
}
exports.showUsers = function() {
    return users;
}
exports.authCheck = function(token) {
    if (users.indexOf(token) >= 0) {
        return true;
    } else {
        return false;
    }
}