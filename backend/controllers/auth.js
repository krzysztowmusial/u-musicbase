const express = require('express');
const router = express.Router();
const Session = require('../models/sessions');
const db = require('../models/database')
const bcrypt = require('bcrypt');

users = Session.users;

router.post('/register', (req, res) => {
    db.User.findAll({
        where: { username: req.body.username }
    }).then((user) => {
        if (user[0]) {
            res.status(409).json({
                message: "Taki użytkownik już istnieje!"
            });
        } else {
            db.User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10)
            }).then(user => {
                Session.addUser(user.username)
                res.status(201).json({
                    message: "Utworzono użytkownika, id: " + user.id
                });
            });
        }
    });
})

router.post('/login', (req, res) => {
    db.User.findAll({
        where: { username: req.body.username }
    }).then((user) => {
        if (user[0]) {
            if(bcrypt.compareSync(req.body.password, user[0].password)) {
                Session.addUser(user[0].username);
                res.status(201).json({
                    message: "Zalogowano poprawnie!",
                    token: token
                });
            } else {
                res.status(201).json({
                    message: "Błędne hasło!",
                    token: "Nie"
                });
            }
        } else {
            res.status(201).json({
                message: "Taki użytkownik nie istnieje!",
                token: "Nie"
            });
        }
    })
});

router.post('/logout', (req, res) => {
    Session.removeUser(req.body.token);
    res.status(201).json({
        users: Session.showUsers()
    });
})

router.post('/auth', (req, res) => {
    res.status(201).json({
        auth: Session.authCheck(req.body.token),
        users: Session.showUsers()
    });
})

module.exports = router;