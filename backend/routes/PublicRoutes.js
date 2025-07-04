const express = require('express');
const router = express.Router();
const CMS = require('../models/CMS');

router.get('/cms', async (req, res) => {
  const cms = await CMS.findOne();
  res.json({
    privacy: cms?.privacy || "",
    terms: cms?.terms || ""
  });
});

module.exports = router;