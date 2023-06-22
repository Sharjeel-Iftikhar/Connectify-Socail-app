import Post from "../models/Posts.js";
import User from "../models/User.js";


// Create
export const CreatePost = async (req, res) => {
    const {userId,description,picturePath} = req.body;
    try{
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

// Read
export const GetFeedPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

// Get User Posts
export const GetUserPosts =async (req, res) => {
    const {userId} = req.params;
    try{
        const posts = await Post.find({userId});
        res.status(200).json(posts);

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

// Like Post 
export const LikePost =async (req,res) =>{
    try{
        const { id } = req.params;
        const {userId} = req.body;
 
        const post = await Post.findById(id);

       
        const isLiked = post.likes.get(userId);
        
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);
        }

        const UpdatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true});   
        res.status(200).json(UpdatedPost);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}