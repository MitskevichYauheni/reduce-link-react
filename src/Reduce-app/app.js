import React from 'react';
import Header from './header';
import Add from './add';
import Show from './show';
import './app.css';

//const ReduceApp = () => <div><h1>App</h1></div>

class ReduceApp extends React.Component {
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
