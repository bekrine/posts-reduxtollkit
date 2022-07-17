import { useSelector,useDispatch } from "react-redux";
import { selectAllError, selectAllPosts, selectAllStatus,fetchPosts } from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch=useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(selectAllStatus)
    const error = useSelector(selectAllError)
    useEffect(()=>{
        if(postsStatus === 'idel'){
            dispatch(fetchPosts())
        }
    },[postsStatus,dispatch])


    let content
    if(postsStatus === 'loading'){
        content=<div>Loading...</div>
    }else if(postsStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
    }else if(postsStatus === 'failed'){
        content=<p>{error}</p>
    }


    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList