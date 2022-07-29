import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectSingelPost} from './postsSlice'

const PostsExcerpt = ({postId}) => {
  const post=useSelector(state=>selectSingelPost(state,postId))
  return (
    <article >
    <h3>{post.title}</h3>
    <p>{post.body.substring(0, 75)}...</p>
    <p className="postCredit">
      <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
         <TimeAgo timestamp={post.date} /> 
    </p>
    <ReactionButtons post={post} /> 
</article>
  )
}

export default PostsExcerpt