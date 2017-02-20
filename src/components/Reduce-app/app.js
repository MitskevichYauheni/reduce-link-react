import React from 'react';
import Header from './header';
import Add from './add';
import Show from './show';
import './app.css';

class ReduceApp extends React.Component {
  // static onEnter(nextState, replace) {
  // const isWrongPassword = window.localStorage.getItem('isWrongPassword')
  // console.log(isWrongPassword)
  //   if (isWrongPassword !== 'true') {
  //     replace('/')
  //   }
  // }
  render() {
    console.log('render');
    return (
      <div className = 'main' >
        <div className='app'>
          <Header />
          <Add />
        </div>
            <Show />
      </div>
    );
  }
}

export default ReduceApp;
