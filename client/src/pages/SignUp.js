import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '../components/Snackbar';

import { authContext } from '../contexts/AuthContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(authContext);
  const [snackbar, setSnackbar] = useState(false)
  const [info, setInfo] = useState({variant: 'success', message: ''})
  const handleSignUp = () => {
    var data = {
      email: email,
      username: username,
      name: name,
      password: password
    }

    axios.post('/signup', data)
    .then((result) => {
      if(!result.data.errors){
        const { accessToken } = result.data;
        const user = jwt_decode(accessToken);
        localStorage.setItem('jwtToken', accessToken);
        setAuthToken(accessToken);
        dispatch({ type: 'LOGIN', payload: user})
      } else {
        setInfo({variant: 'error', message: result.data.errors})
        setSnackbar(true)
      }
    })
    .catch(err => console.log(err))    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                helperText="Never show to the public"
                autoFocus
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username2"
                label="Username"
                name="username2"
                autoComplete="username"
                helperText="unique, short, no spaces"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                helperText="your full name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password2"
                label="Password"
                type="password"
                id="password2"
                helperText="at least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Create new account
          </Button>
        </div>
      </div>
      <Snackbar open={snackbar} props={info} handleClose={() => setSnackbar(false)}/>
    </Container>
  );
}

const setAuthToken = token => {
  if(token){
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
      delete axios.defaults.headers.common["Authorization"];
  }
}