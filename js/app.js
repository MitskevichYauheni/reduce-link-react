//var mongoose = require('mongoose');
//var User = require('./models/user');
//var Link = require('./models/reduceLink');

//mongoose.connect('mongodb://localhost:27017/reduce-link')

window.ee = new EventEmitter();  //необходимость взаимодействия двух компонентов

var More = React.createClass({
  getInitialState: function() {
    return {
      visible: false
    };
  },
  onCheckRuleClick: function(e) {
    this.setState({visible: !this.state.visible});
  },

  render: function() {
    var visible = this.state.visible;


    return(
      <div className = 'more'>

        <a onClick={this.onCheckRuleClick} className="more__window" href="#">
          { (visible ? 'Скрыть' : 'Подробнее') }
        </a>
        <div className={'more-input ' + (visible ? '' : 'none')}>
          <input
            type='text'
            className='more-input__linkInfo'
            placeholder='Информация о ссылке'
            name='info'
            ref='linkInfo'
          />
          <input
            type='text'
            className='more-input__tags'
            placeholder='Введите tags'
            name='tags'
            ref='tags'
          />
        </div>

      </div>
    )
  }
});

var Add = React.createClass({
  getInitialState: function() {
    return {
      srcIsEmpty: true,
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.src).focus();
  },
  onBtnClickHandler: function(e) {
    //window.location.href = "http://localhost:3000/app.html";
    //e.preventDefault();
    if(e == false){
      alert('ytdthyj!')
    }
    //var passwordEl = ReactDOM.findDOMNode(this.refs.password);

    var src = ReactDOM.findDOMNode(this.refs.src).value;
    //var password = passwordEl.value;

    /*var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];*/


    //passwordEl.value = '';
    //this.setState({passwordIsEmpty: true});
  },
  /*onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  },*/
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  render: function() {
    var srcIsEmpty = this.state.srcIsEmpty;
    return (
      <form className='add' action="http://localhost:3000/link/" method="post">
        <h3> Создать короткую ссылку </h3>
        <div className = 'little-input'>
          <input
            type='text'
            className='little-input__src'
            onChange={this.onFieldChange.bind(this, 'srcIsEmpty')}
            placeholder='Введите полную ссылку'
            name='src'
            ref='src'
          />
          <input
            type='text'
            className='little-input__reduceLink'
            placeholder='Короткая ссылка'
            name='reduceLink'
            ref='reduceLink'
            disabled
          />
          <button
            className='add__btn'
            //onClick={this.onBtnClickHandler}
            ref='alert_button'
            disabled={srcIsEmpty}
            >
            Сократить
          </button>
        </div>

            <More />

      </form>
    );
  }
});

var Show = React.createClass({
    /*propTypes: {
      data: React.PropTypes.shape({
      src: React.PropTypes.string.isRequired,
      reduceLink: React.PropTypes.string.isRequired,
      linkInfo: React.PropTypes.string.isRequired,
      click: React.PropTypes.Number.isRequired,
      tags: React.PropTypes.Array.isRequired
    })
  },*/
  getInitialState: function() {
    return {
      visible: false
    };
  },
  onCheckRuleClick: function(e) {
    this.setState({visible: !this.state.visible});
  },

  render: function() {
    var visible = this.state.visible;


    return(
      <div className = 'show'>

        <a onClick={this.onCheckRuleClick} className="show__window" href="#">
          { (visible ? 'Скрыть' : 'Ваши ссылки') }
        </a>
        <div className={'show-info ' + (visible ? '' : 'none')}>
          <p className='show-info__src'>Полная ссылка: {/*src*/}</p>
          <p className='show-info__reduceLink'>Короткая ссылка: {/*reduceLink*/}</p>
          <p className='show-info__linkInfo'>Информация о ссылке: {/*linkInfo*/}</p>
          <p className='show-info__click'>Количествео кликов по ссылке: {/*click*/}</p>
          <div className='show-info__tags'>Tags:
            {/*
                tags.map(function(tag){
                    <a onClick={this.onCheckRuleClick} className="show__window" href="#">
                  })
            </a>
            */}
          </div>
          <input
            type='text'
            className='more-input__tags'
            placeholder='Введите tags'
            ref='tags'
          />
        </div>

      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    console.log('render');
    return (
      <div>
        <div className='app'>
          <h3>Пользователь: {/* Тут нужно добавить имя из БД*/}</h3>
          <Add />
        </div>
        <div className='Show'>
            <Show />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
