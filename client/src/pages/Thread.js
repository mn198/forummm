import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
// 3rd party
import axios from 'axios';
import moment from 'moment';
// contexts
import {threadListContext} from '../contexts/ThreadListContext';
import { authContext } from '../contexts/AuthContext';
//
import UserDialog from './User';

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
  right: {
    float: 'right'
  },
  frame: {
    width: '100%',
    height: '150px'
  },
  frame2: {
    width: '100%',
    height: '100px'
  },
  color: {
    backgroundColor: '#4caf50',
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  topic: {
    fontSize: '1.1487em'
  },
  topicNum: {
    fontSize: '1em'
  },
  pad: {
    paddingLeft: theme.spacing(1)
  }
}));


function Thread() {
  const classes = useStyles();
  const { threads, dispatch } = useContext(threadListContext);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const handleClose = () => { setOpenLoginDialog(false); }
  const handleOpen = () => { setOpenLoginDialog(true); }
  const { auth } = useContext(authContext);

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

  const redirect = () => {
    window.location.href = "/t/new";
  }

  useEffect(() => {
    axios.get('/t')
    .then((res) => {
      dispatch({ type: 'GET_THREAD_LIST', payload: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }, [auth.isAuthenticated])

  return (

      <Container maxWidth='lg'>
        
        <Paper variant="outlined">
          <Box className={classes.alignItemsAndJustifyContent}>
            <Typography>Simple forum</Typography>
          </Box>        
        </Paper>
        
        <Grid container className={classes.mt4}>
          <Grid item lg={8}>
            <Grid container spacing={1}>
              <Grid item><Button variant="outlined" color="primary">new</Button></Grid>
              <Grid item><Button variant="outlined">top</Button></Grid>
              <Grid item><Button variant="outlined">reply</Button></Grid>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <Button className={classes.right} variant="contained" color="secondary" 
            onClick={auth.isAuthenticated ? redirect: handleOpen}>
              login to post
            </Button>
            <UserDialog open={openLoginDialog} handleClose={handleClose}/>
          </Grid>
        </Grid>

        <Grid container justify="space-between" alignItems="center" spacing={1} className={classes.mt2}>
          <Grid item lg={7} xs={6}>
            <div className={classes.pad}>
              <Typography className={classes.topic}>Topic</Typography>
            </div>
          </Grid>
          <Grid item lg={2} xs={1}>
          </Grid>
          <Grid item lg={1} xs={1}>
            <Typography className={classes.topicNum}>Rep</Typography>
          </Grid>
          <Hidden only="xs">
            <Grid item lg={1} xs={1}>
              <Typography className={classes.topicNum}>View</Typography>
            </Grid>
          </Hidden>
          <Grid item lg={1} xs={2}>
            <Typography className={classes.topicNum}>Activity</Typography>
          </Grid>
        </Grid>
        <Divider variant="inset"/>

        {threads.isLoading ? '': threads.threadlist.map((d, index) => {
          return (
            <div key={index}>
              <Grid container justify="space-between" alignItems="center" spacing={1} className={classes.mt2}>
              <Grid item lg={7} xs={6}>
                <div className={classes.pad}>
                  <Link href={'/t/' + d.slug + '/' + d._id} ><Typography className={classes.topic}>{d.title}</Typography></Link>
                  <Chip label={!d.category ? '' : d.category.name} style={{ backgroundColor: d.category.color, color: 'white'}}/>
                </div>
              </Grid>
              <Grid item lg={2} xs={1}>
                <Grid container spacing={1}>
                  <Grid item><Avatar variant="rounded" className={classes.color}>A</Avatar></Grid>
                  <Hidden only="xs">
                    { d.posts.map((d, i) => <Grid item key={i}><Avatar variant="rounded" className={classes.color}>A</Avatar></Grid>) }
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item lg={1} xs={1}>
                <Typography className={classes.topicNum}>{d.posts.length}</Typography>
              </Grid>
              <Hidden only="xs">
                <Grid item lg={1} xs={1}>
                  <Typography className={classes.topicNum}>?</Typography>
                </Grid>
              </Hidden>
              <Grid item lg={1} xs={2}>
                <Typography className={classes.topicNum}>{moment(d.createdAt).fromNow() }</Typography>
              </Grid>
            </Grid>
            <Divider variant="inset"/>
          </div>
          )
        })}

      </Container>
  );
}

export default Thread;
