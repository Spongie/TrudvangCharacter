const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserModel = require('../models/user');

router.post('/register', async (req, res) => {
    let user = new UserModel({
      userName: req.body.userName,
      password: req.body.password
    });

    try {
      let result = await user.save();
      return res.send(result);
    } catch(error) {
      return next(error);
    }

    user.save(function(error, document) {
      if (error) {
        res.send(error);
      } else {
        res.send("Registered");
      }
    });
  });
  
router.post('/login', (req, res) => {
  UserModel.findOne({userName: req.body.userName}, "userName password", (err, docs) => {
    docs.comparePassword(req.body.password, function(error, isMatch) {
      if (error) {
        throw error;
      }

      if (isMatch) {
        res.send("LOGIN OK!");
      } else {
        res.send("BAD LOGIN");
      }
    });
  })
});

router.get('/users', async (req, res) => {
    UserModel.find({}, "userName password", function(err, docs) {
      res.send(docs);
      return next(err);
    });
});


  module.exports = router;