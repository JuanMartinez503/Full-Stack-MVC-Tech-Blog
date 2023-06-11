const router = require('express').Router()
const {Blog ,Comment, User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/' , async (req, res)=>{
try {
    const dataBlog = await Blog.findAll({
        include: {
            model:User,
            attributes: ['user_name']
        }
        
    })
    const blogs = dataBlog.map(blog=>blog.get({plain:true}))
    res.render('homepage', {blogs,
    logged_in:req.session.logged_in})
} catch (err) {
    res.status(500).json(err)
}
})
router.get('/blogs/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['user_name']
            }
          },
          {
            model: User,
            attributes: ['user_name']
          }
        ]
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
  
      const blog = blogData.get({ plain: true });
      res.render('blogid', {
        blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  
  
  
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/blogs');
      return;
    }
  
    res.render('login');
  });
  router.get('/create',withAuth, (req, res)=>{
    res.render('create', {logged_in: req.session.logged_in})
  })
  router.get('/signup', (req, res)=>{
    res.render('signup')
  })
  router.get('/blogs', withAuth,async (req, res)=>{
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Blog }],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('newblogs', {
          ...user,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
  })
  router.get('/update/:id', async(req, res)=>{
    try {
        const blogData = await Blog.findByPk(req.params.id,{
            include:{
                model:User,
                attributes: ['user_name']
            }
            
        })
        const blog = blogData.get({plain:true})
        res.render('update', {...blog, logged_in:req.session.logged_in})
    } catch (err) {
        res.status(500).json(err)
    }
    })
module.exports = router