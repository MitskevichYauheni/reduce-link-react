import React from 'react';
import Header from './header';
import Add from './add';
import Show from './show';
import './app.css';

class ReduceApp extends React.Component {
  render() {
    console.log('render');
    return (
      <div className='main' >
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
