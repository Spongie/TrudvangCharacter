const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/login/', (req, res) => {
  res.send('fuck');
});

module.exports = router;