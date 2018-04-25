const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CharacterModel = require('../models/character');

router.use(function(req, res, next) {
  console.log('Requst to the character API');
  next();
});

router.post('/save', async (req, res) => {
    let character = new CharacterModel(req.body);
    let id = character._id;
    delete character._id;

    const response = await CharacterModel.findByIdAndUpdate(id, character, {upsert: true, new: true}, function(err, doc) {
        if (err) {
            console.log(err);
        }

        res.send(doc);
    });
});

router.get('/find/:id', async (req, res) => {
    CharacterModel.findById(req.params.id, (err, character) => {
        res.send(character);
    });
});

router.get('/all', async (req, res) => {
    CharacterModel.find({}, "", function(err, docs) {
        res.send(docs);
      });
});

module.exports = router;