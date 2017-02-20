import React from 'react';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import SignIn from './components/Sign-in/sign-in';
import ReduceApp from './components/Reduce-app/app';
import Archive from './components/All-links/archive';
import NotFound from './components/NotFound'
import requireAuthentication from './containers/AuthenticatedComponent';

const store = configureStore();

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Router history={ browserHistory } >
            <Route path='/' component = {requireAuthentication(SignIn)}></Route>
            <Route path='/reduce-app' component = {requireAuthentication(ReduceApp)}></Route>
            <Route path='/all-links' component = {Archive}></Route>
            <Route path='*' component={NotFound} />
        </Router>
      </ Provider>
    )
  }
}

export default App;
