import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LikeButton from './LikeButton';
// 3rd party
import moment from 'moment';
import SlateViewport from './SlateViewport';
import { threadContext } from '../contexts/ThreadContext';

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

const img = "https://previews.123rf.com/images/pandavector/pandavector1609/pandavector160900800/63731494-man-with-beard-icon-cartoon-single-avatar-peaople-icon-from-the-big-avatar-collection-.jpg";

function Comment(props) {
  const classes = useStyles();
  const { thread } = useContext(threadContext);
  const { posts } = thread.thread;

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

  return (
    <div>
    { !posts.length ? '': posts.map((post, index) => 
    <Container maxWidth='lg' key={index}>
        <Grid container className={classes.mt2}>
          <Grid item lg={8}>
            <Grid container>
              <Grid item lg={1} xs={1}>
                <Avatar variant="circle" className={classes.bigAvatar}>
                  {post.userId.username[0].toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item lg={11} xs={11}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item><Typography>{post.userId.username}</Typography></Grid>
                  <Grid item><Typography>{moment(post.createdAt).fromNow()}</Typography></Grid> 
                </Grid>
                <Grid container className={classes.mt2}>
                  <SlateViewport value={JSON.parse(post.content)}/>
                </Grid>
                <Grid container justify="flex-end" alignItems="center" className={classes.mt2}>
                  <Grid item>
                    <LikeButton likes={post.likes} postId={post._id}/>
                  </Grid>
                  <Grid item><Typography>share</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.mt2}/>   
          </Grid>
          <Grid item lg={4}></Grid>
        </Grid>
      </Container>
    )}
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


export default Comment;
