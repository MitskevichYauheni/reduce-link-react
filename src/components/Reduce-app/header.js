import React from 'react';
import { Router, Route, Redirect, Link, HashHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
      firstBoot: true,
      visible: false,
      activeUser: '',
      amountLinks: 0,
      goLinks: 0
    }
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
    this.authorizationEnd = this.authorizationEnd.bind(this);
  }
  onCheckRuleClick(e) {
    this.server();
    this.setState({visible: !this.state.visible});
  }
  server(){
    fetch('http://localhost:3000/user-info', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({activeUser: authResult.user , amountLinks: authResult.amountLinks, goLinks: authResult.goLinks});
                console.log(authResult)
      })
  }
  authorizationEnd(e){
    this.props.actions.authorizationEnd({isAuthenticated: false});
  }

  firstBoot(e){
    if(this.state.firstBoot){
      this.server();
      this.setState({ firstBoot: false })
    }
  }

  render() {
    this.firstBoot();

    let visible = this.state.visible,
        activeUser = this.state.activeUser,
        amountLinks = this.state.amountLinks,
        goLinks = this.state.goLinks;

    return(
      <div className = 'header-page'>
        <div className = 'header-content'>
          <h3>Пользователь: {activeUser}</h3>
          <div className = 'header-content__window'>
            <a onClick={this.onCheckRuleClick} className = 'header-content__window__link' >
              { (visible ? '↑' : '↓') }
            </a>
            <div className={'header-content__window__more-info ' + (visible ? '' : 'none')}>
              <p>Кол-во ссылок: {amountLinks}</p>
              <p>Кол-во переходов по ссылкам: {goLinks}</p>
            </div>
          </div>
        </div>
        <div className = 'header-links'>
          <Link className ='header-page__all-links' to='/all-links'> Все ссылки </Link>
          <Link className ='header-page__all-links' onClick={this.authorizationEnd} to='/'> Выход </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
