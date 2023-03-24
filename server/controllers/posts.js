import Post from '../models/Post.js'
import User from '../models/User.js'


export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()
        const post = await Post.find()
        res.status(400).json({ message: err.message })
        
    } catch (error) {
        req.status(409).json({message : error.message})
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.statut(201).json({post})
    } catch (error) {
        req.status(409).json({message : error.message})

    }
}