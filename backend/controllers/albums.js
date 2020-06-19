const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/api/albums/all', (req, res) => {
    db.Album.findAll().then((albums) => {
        res.status(201).json({
            albums: albums
        });
    })
})

router.get('/api/albums/:genre', (req, res) => {
    db.Album.findAll({
        where: {genre: req.params.genre}
    }).then((albums) => {
        res.status(201).json({
            albums: albums
        })
    })
})

module.exports = router;