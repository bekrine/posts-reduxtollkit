import { useSelector } from "react-redux";
import { selectAllError, selectAllPosts, selectAllStatus } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(selectAllStatus)
    const error = useSelector(selectAllError)
    


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