import React from 'react';
//import Header from './header';
import Show from './show';
//import './app.css';

class Archive extends React.Component {
  render() {
    console.log('render');
    return (
      <div className = 'main'>
        <Show />
      </div>
    );
  }
};

export default Archive;
