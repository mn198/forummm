import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '../components/Snackbar';

import { authContext } from '../contexts/AuthContext';
// 3rd party
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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

const setAuthToken = token => {
  if(token){
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
      delete axios.defaults.headers.common["Authorization"];
  }
}

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(authContext);
  const [snackbar, setSnackbar] = useState(false);
  const [info, setInfo] = useState({variant: 'success', message: ''})
  
  const handleLogin = () => {
    var data = {
      username: username,
      password: password
    }

    axios.post('/auth', data)
    .then((result) => {
      const { accessToken } = result.data;
      const user = jwt_decode(accessToken);
      localStorage.setItem('jwtToken', accessToken);
      setAuthToken(accessToken);
      setInfo({variant: 'success', message: 'Login successfully'})
      setSnackbar(true)
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: user})
      }, 800);
    })
    .catch(err => console.log(err))
  }
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username1"
            label="Email or Username"
            name="username1"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>
      </div>
      <Snackbar open={snackbar} props={info} handleClose={() => setSnackbar(false)}/>
    </Container>
  );
}