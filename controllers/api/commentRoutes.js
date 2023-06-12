const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);

 
      res.status(200).json(commentData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;