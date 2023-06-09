const router = require('express').Router()
const { User , Blog} = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async(req, res)=>{
    try {
        const createBlog = await Blog.create({
            ...req.body, 
            user_id: req.session.user_id,
        })
        res.status(200).json(createBlog)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.delete('/:id', withAuth, async (req, res)=>{
    try {
        const blogData = await Blog.destroy({
            where:{
                id:req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!blogData){
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        } else{
            res.status(200).json(blogData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
router.put('/:id', withAuth, async (req, res)=>{
    try {
        const blogData = await Blog.update(req.body,{
            where:{
                id:req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!blogData){
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        } else{
            res.status(200).json(blogData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router