import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';
const POSTS_URL='https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts:[],
    status:'idel',
    error:null
}

export const fetchPosts=createAsyncThunk('posts/fetchposts',async()=>{
    try {
        const respance=await axios.get(POSTS_URL)
        return [...respance.data]
    } catch (error) {
        return error.message
    }
} )

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status='succeeded'
            let min=1
            const loadedPost=action.payload.map(post=>{
                post.date=sub(new Date(),{minutes:min++}).toString()
                post.reactions={
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post
            })
            
            state.posts=state.posts.concat(loadedPost)
        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
    }
                        
})

export const selectAllPosts = (state) => state.posts.posts;
export const selectAllStatus = (state) => state.posts.status;
export const selectAllError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer