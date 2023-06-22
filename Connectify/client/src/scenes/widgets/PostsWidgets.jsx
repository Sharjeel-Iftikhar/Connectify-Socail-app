import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../../state";
import PostWidget from "../widgets/PostWidget";

const PostsWidgets = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    
    

    const getPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("Data to send",data);
        dispatch(setPosts({posts:data}));
        console.log("In get Post");
        
        console.log("posts",posts);
       
    };

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({posts:data}));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};
export default PostsWidgets;