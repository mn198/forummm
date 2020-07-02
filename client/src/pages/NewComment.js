import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Avatar,
        Divider, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Editor from './Editor';
import { authContext } from '../contexts/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  mt2: {
    marginTop: theme.spacing(2)
  },
  bigAvatar: {
    width: '90%',
    height: 'auto',
  },
  w2: {
    width: '100%',
    minHeight: '200px'
  }
}));

export default function NewComment(props){
  const classes = useStyles();
  const [content, setContent] = useState(initialValue)
  const { auth } = useContext(authContext);
  let { slug, id } = useParams();

  const handleNewPost = () => {
    var data = {
      userId: auth.user.userId,
      threadId: id,
      content: JSON.stringify(content),
      replyTo: null
    }

    axios.post('/t/' + slug + '/' + id, data)
    .then((result) => {
      window.location.reload();
    })
    .catch(err => console.log(err));

  }

  return(
    <Container maxWidth="lg">
      { !auth.isAuthenticated ? '' :
      <Grid container className={classes.mt2}>
        <Grid item lg={8}>
          <Grid container>
            <Grid item lg={1} xs={1}>
              <Avatar variant="circle">{auth.user.username[0].toUpperCase()}</Avatar>
            </Grid>
            <Grid item lg={11} xs={11}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item><Typography>{auth.user.username}</Typography></Grid>
                <Grid item><Typography></Typography></Grid> 
              </Grid>
              <Grid container className={classes.mt2}>
                <Paper variant="outlined" className={classes.w2}>
                  <Editor value={content} setValue={setContent}/>
                </Paper>
              </Grid>
              <Grid container justify="flex-end" alignItems="center" className={classes.mt2}>
                <Grid item><Button variant="contained" onClick={handleNewPost}>reply</Button></Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.mt2}/>   
        </Grid>
        <Grid item lg={4}></Grid>
      </Grid>
      }
    </Container>
  )
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'Type here... ' }
    ],
  }
]