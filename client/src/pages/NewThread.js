import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'; 
import Divider from '@material-ui/core/Divider'; 
import Typography from '@material-ui/core/Typography'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SlateViewport from './SlateViewport';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '../components/Snackbar';
// 3rd party
import Editor from './Editor';
import axios from 'axios'
import { authContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  pad: {
    padding: '8px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  w: {
    width: '400px'
  },
  w2: {
    minHeight: '500px'
  },
  mt: {
    marginTop: theme.spacing(2)
  }
}));

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'Type here... ' }
    ],
  }
]

const ListCategory = (props) => {
  const classes = useStyles();
  return(
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="category">Select a category</InputLabel>
      <Select
        value={props.cat}
        labelId="category"
        label="Select a category"
        onChange={e => props.setCat(e.target.value)}
        >
          { !props.categories ? '' : props.categories.map((d) => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}

      </Select>
    </FormControl>
  )
}

export default function NewThread(){
  const [content, setContent] = useState(initialValue)
  const [categories, setCategories] = useState(null);
  const [cat, setCat] = useState('');
  const [title, setTitle] = useState('');
  const { auth } = useContext(authContext);
  const [snackbar, setSnackbar] = useState(false);
  const [info, setInfo] = useState({variant: 'success', message: ''})

  useEffect(() => {
    if(auth.isAuthenticated){
      axios.get('/c')
      .then(result => {
        setCategories(result.data)
      })
      .catch(err => console.log(err))
    } else {
      window.location.href = '/';
    }
  }, [auth.isAuthenticated])

  const handlePostNewThread = () => {
    var data = {
      title: title,
      author: auth.user.userId,
      content: JSON.stringify(content),
      category: cat
    }
    
    axios.post('/t', data)
    .then((result) => {
      if(!result.data.errors)
        window.location.href = '/t/' + result.data.slug + '/' + result.data._id
      else {
        setInfo({variant: 'error', message: 'Missing some fields'})
        setSnackbar(true);
      }
    })
    .catch(err => console.log(err))
  }

  const classes = useStyles();
    return(
     <Container maxWidth="lg">
       <Grid container>
          <Grid item lg={8}>
            <Typography variant="h4">Post new thread</Typography>
            <Divider variant="inset"/>
          </Grid>
        </Grid>
        <Paper variant="outlined" className={classes.pad}>
          <Grid container direction="column">
            <Grid item><Typography variant="body2">Enter the thread title and the category to post it in</Typography></Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <ListCategory categories={categories} cat={cat} setCat={setCat}/>
                <TextField
                  className={classes.w}
                  variant="outlined"
                  label="Thread title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Grid container className={classes.mt}>
          <Grid item xs={6}>
            <Paper variant="outlined" className={classes.pad + ' ' + classes.w2}>
              <Editor value={content} setValue={setContent}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined" className={classes.pad+ ' ' + classes.w2}>
              <SlateViewport component={<Toolbar style={{backgroundColor: 'hsla(0,0%,96%,.7)'}}>Preview</Toolbar>} value={content}/>
            </Paper>
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" className={classes.mt} onClick={handlePostNewThread}>Post</Button>
        <Snackbar open={snackbar} props={info} handleClose={() => setSnackbar(false)}/>
     </Container>   
    )
}