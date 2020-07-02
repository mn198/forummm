import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import NewComment from './NewComment';
import Comment from './Comment';
import LikeButton from './LikeButton';
// 3rd party
import axios from 'axios';
import SlateViewport from './SlateViewport';
import moment from 'moment';

//contexts
import {threadContext} from '../contexts/ThreadContext';

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mt4: {
    marginTop: theme.spacing(4)
  },
  mt2: {
    marginTop: theme.spacing(2)
  },
  bigAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  frame: {
    width: '100%',
    height: '100px'
  }
}));

//const img = "https://previews.123rf.com/images/pandavector/pandavector1609/pandavector160900800/63731494-man-with-beard-icon-cartoon-single-avatar-peaople-icon-from-the-big-avatar-collection-.jpg";

function Post() {
  const classes = useStyles();
  let {slug, id} = useParams();

  const { thread, dispatch } = useContext(threadContext);

  useEffect(() => {
    axios.get('/t/'+ slug + '/' + id)
    .then((result) => {
      if(result.data !== null)
        dispatch({ type: 'GET_THREAD', payload: result.data})
    })
    .catch(err => console.log(err));
  }, [slug, id])

  moment.updateLocale('en', {
    relativeTime: {
      future : 'in %s',
      past   : '%s',
      s  : function (number, withoutSuffix) {
        return withoutSuffix ? 'now' : 'a few seconds';
      },
      m  : '1m',
      mm : '%dm',
      h  : '1h',
      hh : '%dh',
      d  : '1d',
      dd : '%dd',
      M  : '1mth',
      MM : '%dmth',
      y  : '1y',
      yy : '%dy'
    }
  });

  const uniqueUser = (posts, author) => {
    var data = new Set();
    data.add(author);
    for(var i = 0; i < posts.length; ++i)
      data.add(posts[i].userId.username);
    return(
      Array.from(data).slice(Math.max(data.length-5, 0)).map((d, i) => 
            <Avatar key={i} variant="circle" className={classes.smallAvatar} style={{display: 'inline-grid'}}>
              {d[0].toUpperCase()}
            </Avatar>)
    )
  }

  const uniqueUserNum = (posts, author) => {
    var data = new Set();
    data.add(author);
    for(var i = 0; i < posts.length; ++i)
      data.add(posts[i].userId.username);
    return data.size.toString();
  }

  const lastReply = (posts, created) => {
    var p = posts[posts.length-1]
    return p !== undefined ? p.createdAt : created;
  }

  return (
    <div>
    { thread.isLoading ? '': 
    <Container maxWidth='lg'>
        <Grid container>
          <Grid item lg={8}>
            <Typography variant="h4">{thread.thread.title}</Typography>
            <Chip label={thread.thread.category.name} style={{backgroundColor: thread.thread.category.color}}/>
            <Divider variant="inset"/>
          </Grid>
        </Grid>

        <Grid container className={classes.mt2}>
          <Grid item lg={8}>
            <Grid container>
              <Grid item lg={1} xs={1}>
                <Avatar variant="circle" className={classes.bigAvatar} >{thread.thread.author.username[0].toUpperCase()}</Avatar>
              </Grid>
              <Grid item lg={11} xs={11}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item><Typography>{thread.thread.author.username}</Typography></Grid>
                  <Grid item><Typography>{moment(thread.thread.createdAt).fromNow()}</Typography></Grid> 
                </Grid>
                <Grid container className={classes.mt2}>
                  <SlateViewport value={JSON.parse(thread.thread.content)}/>
                </Grid>
                <Grid container justify="flex-end" alignItems="center" className={classes.mt2}>
                  <Grid item>
                    <LikeButton likes={thread.thread.likes} threadId={thread.thread._id}/>
                  </Grid>
                  <Grid item><Typography>share</Typography></Grid>
                </Grid>
                <Paper variant="outlined" className={classes.mt4} style={{padding: '8px 0px 8px 8px'}}>
                  <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item lg={2} xs={3}>
                        <Typography>created</Typography>
                        <Grid container alignItems="center">
                          <Avatar variant="circle" className={classes.smallAvatar} style={{display: 'inline-grid'}}>
                          {thread.thread.author.username[0].toUpperCase()}
                          </Avatar>
                          <Typography style={{display: 'inline'}}>{moment(thread.thread.createdAt).fromNow()}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item lg={2} xs={3}>
                        <Typography>last reply</Typography>
                        <Grid container alignItems="center">
                          <Avatar variant="circle" className={classes.smallAvatar} style={{display: 'inline-grid'}}>
                          {thread.thread.author.username[0].toUpperCase()}
                          </Avatar>
                          <Typography style={{display: 'inline'}}>
                            {moment(lastReply(thread.thread.posts, thread.thread.createdAt)).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item lg={1} xs={3}>
                        <Typography variant="h6" align="center">{thread.thread.posts.length}</Typography>
                        <Typography align="center">replies</Typography>
                      </Grid>
                      <Grid item lg={1} xs={2}>
                        <Typography variant="h6" align="center">{thread.thread.viewCount}</Typography>
                        <Typography align="center">views</Typography>
                      </Grid>
                      <Grid item lg={1} xs={2}>
                        <Typography variant="h6" align="center">{uniqueUserNum(thread.thread.posts, thread.thread.author.username)}</Typography>
                        <Typography align="center">users</Typography>
                      </Grid>
                      <Grid item lg={1} xs={2}>
                        <Typography variant="h6" align="center">{thread.thread.likes.length}</Typography>
                        <Typography align="center">likes</Typography>
                      </Grid>
                      <Grid item lg={4}>
                      {uniqueUser(thread.thread.posts, thread.thread.author.username)}
                      </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Divider className={classes.mt2}/>   
          </Grid>
          <Grid item lg={4}></Grid>
        </Grid>
        <Comment/>
        <NewComment/>
      </Container>
    }
    </div>

  );
}

// const initialValue = [
//   {
//     type: 'paragraph',
//     children: [
//       { text: 'Type here... ' }
//     ],
//   }
// ]


export default Post;
