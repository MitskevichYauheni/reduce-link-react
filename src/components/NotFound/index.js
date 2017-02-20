import React, { Component } from 'react'
import { Link } from 'react-router'
import './notFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className='not-found'>
        Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
      </div>
    )
  }
}
