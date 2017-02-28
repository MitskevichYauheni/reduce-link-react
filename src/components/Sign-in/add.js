import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'

class Add extends React.Component {
  constructor(){
    super();
    this.state = {
      userIsEmpty: true,
      passwordIsEmpty: true,
      isWrongPassword: false,
      sendPassword: false,
      user: '',
      password: ''
    }
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
  }
  componentDidMount() {
    (this.refs.user).focus();
  }
  onBtnClickHandler(e) {
    e.preventDefault();
    fetch('http://localhost:3000/', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: ReactDOM.findDOMNode(this.refs.user).value,
        password: ReactDOM.findDOMNode(this.refs.password).value
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({sendPassword: true})
        console.log(authResult);
        this.setState({ isWrongPassword: authResult.password });
        if(this.state.isWrongPassword){
          this.props.actions.login({isAuthenticated: true});
        } else {
          this.props.actions.login({isAuthenticated: false});
          let passwordEl = ReactDOM.findDOMNode(this.refs.password);
          passwordEl.value = '';
          this.setState({passwordIsEmpty: true});
        }
      })
  }
  onFieldChange(fieldName, e) {
    this.setState({
      user: this.refs.user.value,
      password: this.refs.password.value
    })
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
      this.setState({sendPassword: false});
    } else {
      this.setState({[''+fieldName]:true})
    }
  }

  render() {
  let userIsEmpty = this.state.userIsEmpty,
      passwordIsEmpty = this.state.passwordIsEmpty,
      sendPassword = this.state.sendPassword,
      isWrongPassword = this.state.isWrongPassword;

    return(
      <div>
        <div className='main'>
          <div className='check-in'>
            <h3>Регистрация / Вход</h3>
            <div className='add'>
              <input
                type='text'
                className='add__user'
                onChange={this.onFieldChange.bind(this, 'userIsEmpty')}
                placeholder='Login'
                name='name'
                ref='user'
              />
              <input
                type='password'
                className={'add__password '+ ((isWrongPassword === false && sendPassword === true)  ? 'add__wrong-input' : '')}
                onChange={this.onFieldChange.bind(this, 'passwordIsEmpty')}
                placeholder='Введите пароль'
                name='password'
                ref='password'
              ></input>

              <p className={'add__wrong ' + ((isWrongPassword === false && sendPassword === true)  ? '' : 'none')}> Неверный пароль </p>

              <button
                className='add__btn'
                onClick={this.onBtnClickHandler.bind(this)}
                ref='alert_button'
                disabled={userIsEmpty || passwordIsEmpty}
                >
                Регистрация / Вход
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Add);
