import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Layout from './pages/Layout';
import Thread from './pages/Thread'
import Post from './pages/Post'
import NewThread from './pages/NewThread';
import User from './pages/User';
import PrivateRoute from './pages/PrivateRoute';
// contexts
import AuthContextProvider from './contexts/AuthContext';
import ThreadListContextProvider from './contexts/ThreadListContext';
import ThreadContextProvider from './contexts/ThreadContext';

function App() {
  return (
    <Router>
      <Switch>
        <AuthContextProvider>
          <Route path="/login" component={() => <Layout component={User}/>}/> 
          <ThreadListContextProvider>
            <Route exact path='/' component={() => <Layout component={Thread}/>}/>
          </ThreadListContextProvider>
          <ThreadContextProvider>
            <Route path='/t/:slug/:id' component={() => <Layout component={Post}/>}/>
          </ThreadContextProvider>
          <PrivateRoute exact path='/t/new' component={() => <Layout component={NewThread}/>}/>
        </AuthContextProvider>
      </Switch>
    </Router>

  );
}

export default App;
