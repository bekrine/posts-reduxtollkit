import React from 'react'
import {selectSingelPost} from './postsSlice'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import {useParams} from 'react-router-dom'
import {Link} from "react-router-dom"

function SingelPostPage() {
  const {postid}=useParams()
  const post =useSelector((state)=>selectSingelPost(state,Number(postid)))
    if(!post){
        return <section>
                <h2>post not found</h2>
        </section>
    }
  return (
     <article >
    <h3>{post.title}</h3>
    <p>{post.body }</p>
    <p className="postCredit">
      <Link to={`/post/edit/${post.id}`}>Edit Poste</Link>
        <PostAuthor userId={post.userId} />
         <TimeAgo timestamp={post.date} /> 
    </p>
    <ReactionButtons post={post} /> 
    </article>
  )
}

export default SingelPostPage