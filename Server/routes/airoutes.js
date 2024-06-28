const express = require('express');
const { generateContent } = require('../controller/aicontroller');

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const content = await generateContent(prompt);
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
