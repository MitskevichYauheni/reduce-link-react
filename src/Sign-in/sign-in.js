import React from 'react';
import Header from './header';
import Add from './add';
import './sign-in.css';

class SignIn extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <Add />
      </div>
    )
  }
}

export default SignIn;
