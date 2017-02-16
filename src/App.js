import React from 'react';
import { Router, Route, Redirect, Link, HashHistory } from 'react-router';
import SignIn from './Sign-in/sign-in';
import ReduceApp from './Reduce-app/app';
import Archive from './All-links/archive';


//const SignIn = () => <div><h1>SignIn</h1><Links /></div>
//const ReduceApp = () => <div><h1>App</h1><Links /></div>
//const AllLinks = () => <div><h1>AllLinks</h1><Links /></div>

const Links = () =>
  <nav>
    <Link to='/'> Home </Link>
    <Link to='/reduce-app'> About </Link>
    <Link to='/all-links'> Contact </Link>
  </nav>

class App extends React.Component {
  render() {
    return(
      <Router history={ HashHistory } >
          <Route path='/' component = {SignIn}></Route>
          <Route path='/reduce-app' component = {ReduceApp}></Route>
          <Route path='/all-links' component = {Archive}></Route>
      </Router>
    )
  }
}

export default App;
