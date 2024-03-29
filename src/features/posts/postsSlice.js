import { createSlice, nanoid,createAsyncThunk,createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';
import { act } from "react-dom/test-utils";
const POSTS_URL='https://jsonplaceholder.typicode.com/posts'

const postsAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})

const initialState =postsAdapter.getInitialState( { 
    status:'idel',
    error:null
})

export const fetchPosts=createAsyncThunk('posts/fetchposts',async()=>{
    try {
        const respance=await axios.get(POSTS_URL)
        return [...respance.data]
    } catch (error) {
        return error.message
    }
} )

export const addNewpost=createAsyncThunk('posts/addnewpost',async(inistialPost)=>{
    try {
        const respance=await axios.post(POSTS_URL,inistialPost)
        return respance.data
        
    } catch (error) {
        return error.message
    }
})

export const updatePost=createAsyncThunk('posts/updatepost',async (inistialPost)=>{
    const {id}=inistialPost
    try {
        const respance=await axios.put(`${POSTS_URL}/${id}`,inistialPost)
        return respance.data
    } catch (err) {
        return err.message
    }
})
export const deletePost=createAsyncThunk('posts/deletePost',async (inistialPost)=>{
    const {id}=inistialPost
    try {
        const respance=await axios.delete(`${POSTS_URL}/${id}`)
        if(respance?.status === 200) return inistialPost
        return `${respance?.status}:${respance?.statusText}`
    } catch (err) {
        return err.message
    }
})

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
            const existingPost = state.entities[postId]
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
                post.date=sub(new Date(),{minutes:min++}).toISOString()
                post.reactions={
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post
            })
            
          postsAdapter.upsertMany(state,loadedPost)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(addNewpost.fulfilled,(state,action)=>{
            action.payload.userId=Number(action.payload.userId)
            action.payload.date=new Date().toISOString()
            action.payload.reaction={
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            postsAdapter.addOne(state,action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('update coulde not complte')
                console.log(action.payload)
                return
            }
            action.payload.date=new Date().toISOString()
            postsAdapter.upsertOne(state,action.payload )

        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('delete coulde not complte')
                console.log(action.payload)
                return
            }
            const {id}=action.payload
            postsAdapter.removeOne(state,id)
             
        })
    }
                        
})

export const {
    selectAll:selectAllPosts ,
    selectById:selectSingelPost,
    selectIds:selectPostId
}=postsAdapter.getSelectors(state=>state.posts)
 
export const selectAllStatus = (state) => state.posts.status;
export const selectAllError = (state) => state.posts.error;



export const selectpostByUser=createSelector(
    [selectAllPosts,(state,userId)=>userId],
    (posts,userId)=>posts.filter(post=>post.userId === userId)
)

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer