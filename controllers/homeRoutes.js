const router = require('express').Router()
const {Blog , User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/' , async (req, res)=>{
try {
    const dataBlog = await Blog.findAll({
        include: {
            model:User,
            attributes: ['name']
        }
        
    })
    const blogs = dataBlog.map(blog=>blog.get({plain:true}))
    res.render('homepage', {blogs})
} catch (err) {
    res.status(500).json(err)
}
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/blogs');
      return;
    }
  
    res.render('login');
  });
  router.get('/signup', (req, res)=>{
    res.render('signup')
  })
module.exports = router