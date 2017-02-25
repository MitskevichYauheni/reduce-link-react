import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {

    return(
      <div className='header'>
        <div className='header-page-right header-page-right-0'>
          <Link className='header-page__all-links' to='/reduce-app'> ← Вернуться </Link>
        </div>
      </div>
    )
  }
}

export default Header;
