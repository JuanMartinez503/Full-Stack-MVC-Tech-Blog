const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comment', commentRoutes)
module.exports = router;
//this is where all of my apis are stored for me to do a fetch request