import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IconButton, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import axios from 'axios';
// contexts
import { authContext } from '../contexts/AuthContext';

export default function LikeButton(props){
  const { likes, postId, threadId } = props;
  const { auth } = useContext(authContext);
  const { slug, id } = useParams();
  
  const handleLikeStatus = () => {
    if(auth.isAuthenticated){
      return likes.includes(auth.user.userId)
    }
    return false
  }
  const [like, setLike] = useState(handleLikeStatus());

  const handleLikePress = () => {
    var data = { 
      postId: postId,
      userId: auth.user.userId,
      threadId: threadId 
    } 
    var url = '/t/' + slug + '/' + id + '/like';
    if(postId)
      url += '/p';

    axios.post(url, data)
    .then((result) => {
      likes.push(auth.user.userId)
      setLike(true);
    })
  }

  return(
    <div>
    {auth.isAuthenticated ? 
      <IconButton onClick={like ? ()=>{} : handleLikePress}>
        <Typography>{likes.length}</Typography>
        { like ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary"/>}
      </IconButton>
      :
      <IconButton>
        <Typography>{likes.length}</Typography>
        <FavoriteBorderIcon color="secondary"/>
      </IconButton>
    }
    </div>
  )
}