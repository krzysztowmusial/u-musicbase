const express = require('express');
const router = express.Router();
const db = require('../models/database');
const { request } = require('express');

router.get('/api/fav/:token', (req, res) => {
    db.User.findAll({
        where: { username: req.params.token }
    }).then((user) => {
        db.Fav.findAll({
            where: { user_id: user[0].id }
        }).then((favs) => {
            let ids = [];
    
            favs.forEach(fav => {
                ids.push(fav.album_id);
            });
            
            if (ids.length > 0) {
                db.Album.findAll({
                    where: {
                        id: {
                            [db.Op.or]: ids
                        }
                    }
                }).then((albums) => {
                    res.status(201).json({
                        albums: albums
                    });
                })
            } else {
                res.status(201).json({
                    albums: []
                });
            }

        })
    })
})

router.post('/api/fav/add', (req, res) => {
    db.User.findAll({
        where: { username: req.body.token }
    }).then((user) => {
        db.Fav.create({
            user_id: user[0].id,
            album_id: req.body.album_id
        }).then(() => {
            res.status(201).json({
                message: "Dodano album do ulubionych!"
            });
        })
    })
})

router.post('/api/fav/remove', (req, res) => {
    db.User.findAll({
        where: { username: req.body.token }
    }).then((user) => {

        db.Fav.destroy({
            where: {
                user_id: user[0].id,
                album_id: req.body.album_id
            }
        }).then(() => {
            res.status(201).json({
                message: "Usunięto album z ulubionych!"
            });
        })
    })
})

module.exports = router;