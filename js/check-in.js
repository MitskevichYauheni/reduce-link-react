//var fetch = require('isomorphic-fetch');
/*var mongoose = require('mongoose');
var User = require('./models/user');
var Link = require('./models/reduceLink');

mongoose.connect('mongodb://localhost:27017/reduce-link')*/

//window.ee = new EventEmitter();  //необходимость взаимодействия двух компонентов


var Add = React.createClass({
  getInitialState: function() {
    return {
      userIsEmpty: true,
      passwordIsEmpty: true,
      isWrongPassword: false,
      sendPassword: false
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },
  onBtnClickHandler: function(e) {

    console.log(e);
    e.preventDefault();
    console.log(ReactDOM.findDOMNode(this.refs.user).value);
    console.log(ReactDOM.findDOMNode(this.refs.password).value);
    //this.setState({sendPassword: true})
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
    .then(function(response){
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
          console.error('Error while fetching deficit');
        }
     })
    .then(function(authResult) {
      console.log('authResult.password ' + authResult.password);
      this.setState({ isWrongPassword: authResult.password });
    })
//'this.setState({ isWrongPassword: authResult.password });
    //document.location.href = "http://localhost:3001/app.html";

    /*authResult = {
      auth:'',
      message'',
    }*/
console.log('this.state.isWrongPassword ' + this.state.isWrongPassword);
    if(this.state.isWrongPassword){
      document.location.href = "http://localhost:3001/app.html";
    } else {
      var passwordEl = ReactDOM.findDOMNode(this.refs.password);
      passwordEl.value = '';
      this.setState({passwordIsEmpty: true});
    }
  },
  /*onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  },*/
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
      this.setState({sendPassword: false});
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  render: function() {
    var userIsEmpty = this.state.userIsEmpty,
        passwordIsEmpty = this.state.passwordIsEmpty,
        sendPassword = this.state.sendPassword,
        isWrongPassword = this.state.isWrongPassword;


    return (
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
          className={'add__password '+ ((isWrongPassword == false && sendPassword == true)  ? 'add__wrong-input' : '')}
          onChange={this.onFieldChange.bind(this, 'passwordIsEmpty')}
          placeholder='Введите пароль'
          name='password'
          ref='password'
        ></input>

        <p className = {'add__wrong ' + ((isWrongPassword == false && sendPassword == true)  ? '' : 'none')}> Неверный пароль </p>

        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={userIsEmpty || passwordIsEmpty}
          >
          Регистрация / Вход
        </button>
        </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    console.log('render');
    return (
      <div className='app'>
        <h3>Регистрация / Вход</h3>
        <Add />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
