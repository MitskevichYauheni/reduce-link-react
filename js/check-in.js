

window.ee = new EventEmitter();


var Add = React.createClass({
  getInitialState: function() {
    return {
      userIsEmpty: true,
      passwordIsEmpty: true
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var passwordEl = ReactDOM.findDOMNode(this.refs.password);

    var user = ReactDOM.findDOMNode(this.refs.user).value;
    var password = passwordEl.value;



    passwordEl.value = '';
    this.setState({passwordIsEmpty: true});
  },

  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  render: function() {
    var userIsEmpty = this.state.userIsEmpty,
        passwordIsEmpty = this.state.passwordIsEmpty;
    return (
      <form className='add' action="http://localhost:3000/" method="post">
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
          className='add__password'
          onChange={this.onFieldChange.bind(this, 'passwordIsEmpty')}
          placeholder='Введите пароль'
          name='password'
          ref='password'
        ></input>

        <button
          className='add__btn'
          //onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={userIsEmpty || passwordIsEmpty}
          >
          Регистрация / Вход
        </button>
      </form>
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
