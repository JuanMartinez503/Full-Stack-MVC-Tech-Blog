const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    if (!commentData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
