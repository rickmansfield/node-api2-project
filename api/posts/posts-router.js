const express = require('express');
// const { restart } = require('nodemon');
const Post = require('./posts-model')

const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
        });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        // console.log('posts.router.js ln:23 req.params.id', req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body
        if (!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const newPost = await Post.insert({ title, contents });
            console.log(newPost);
            res.status(201).json({
                id: newPost,
                title,
                contents
            })
            // res.status(201).json(...req.body, req.params.id: newPost)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { title, contents } = req.body
        const { id } = req.params
        if (! await Post.findById(id)){
            return res.status(404).json({message: "The post with the specified ID does not exist"})
        }
        if(!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const editPost = await Post.update(id, { title, contents })
            console.log('XXXXXXXX',editPost);
            // if (editPost === 0) {
            //     res.status(404).json({ message: "The post with the specified ID does not exist" })
            // } else {
            res.status(200).json({
                title, 
                contents,
                id: Number(id)
            })
            // }
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.remove(req.params.id)
        if (!deletePost) {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist" 
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

// router.verb('/', async (req, res) => {
//     try {} catch (err) {
//         res.status(500).json({

//         })
//     }
// })
// router.verb('/', async (req, res) => {
//     try {} catch (err) {
//         res.status(500).json({

//         })
//     }
// })
// router.verb('/', async (req, res) => {
//     try {} catch (err) {
//         res.status(500).json({

//         })
//     }
// })
// router.verb('/', async (req, res) => {
//     try {} catch (err) {
//         res.status(500).json({

//         })
//     }
// })
// router.verb('/', async (req, res) => {
//     try {} catch (err) {
//         res.status(500).json({

//         })
//     }
// })
module.exports = router;
