import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import ChatPage from './components/ChatPage';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/chat' component={ChatPage} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/user/:username' component={UserPage} />
  </Route>
);