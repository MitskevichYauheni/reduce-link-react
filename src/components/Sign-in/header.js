import React from 'react';
import { Router, Route, Redirect, Link, HashHistory } from 'react-router';

class Header extends React.Component {

  render() {

    return(
      <div className = 'header'>
        <div className = 'main'>
          <div className = 'header-page-right'>
            <Link className ='header-page__all-links' to='/all-links'> Все ссылки </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
