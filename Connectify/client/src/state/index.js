import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode :"light",
    user: null,
    posts: [],
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode : (state)=>{
            state.mode = state.mode==="light" ? "dark" : "light";
        },
        setLogin : (state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout : (state)=>{
            state.token = null;
            state.user = null;
        },
        setFriends : (state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.error("User friends does not exist");
            }
        },
        setPosts : (state,action)=>{
            state.posts = action.payload;
        },
        addPost : (state,action)=>{
            const updatdPosts = state.posts.map((post) => {
                if(post._id === action.payload._id){
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatdPosts;
        }

    }
})
export const { setMode,setLogin,setLogout,setFriends,setPosts,addPost } = authSlice.actions;
export default authSlice.reducer;