import { useSelector } from "react-redux";
import { selectPostId, selectAllError, selectAllStatus } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const orderdPostId=useSelector(selectPostId)
    const postsStatus = useSelector(selectAllStatus)
    const error = useSelector(selectAllError)
    


    let content
    if(postsStatus === 'loading'){
        content=<div>Loading...</div>
    }else if(postsStatus === 'succeeded'){
        content=orderdPostId.map(postId=><PostsExcerpt key={postId} postId={postId}/>)
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