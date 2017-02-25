import React from 'react';
import Header from './header';
import Show from './show';
import './all-link.css';

class Archive extends React.Component {
  render() {
    console.log('render');
    return (
      <div className='main'>
        <Header />
        <Show />
      </div>
    );
  }
};

export default Archive;
