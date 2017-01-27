var Header = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      activUser: '',
      amountLinks: 0,
      goLinks: 0
    };
  },
  onCheckRuleClick: function(e) {
    this.server();
    this.setState({visible: !this.state.visible});
  },
  server: function(){
    var self = this;
    fetch('http://localhost:3000/user-info', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(function(response){
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
          console.error('Error while fetching deficit');
        }
     })
    .then(function(authResult) {
        self.setState({activUser: authResult.user , amountLinks: authResult.amountLinks, goLinks: authResult.goLinks})
      })
  },

  render: function() {
    //this.server();

    var visible = this.state.visible,
        activUser = this.state.activUser,
        amountLinks = this.state.amountLinks,
        goLinks = this.state.goLinks;

    return(
      <div className = 'header'>
        <h3>Пользователь: {activUser}</h3>
        <a onClick={this.onCheckRuleClick} className="header__window" href="#">
          { (visible ? '↑' : '↓') }
        </a>
        <div className={'header__more-info ' + (visible ? '' : 'none')}>
          <p>Кол-во ссылок: {amountLinks}</p>
          <p>Кол-во переходов по ссылкам: {goLinks}</p>

        </div>

      </div>
    )
  }
});

var Add = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      srcIsEmpty: true,
      dynamicSrc: ''
    };
  },
  onCheckRuleClick: function(e) {
    this.setState({visible: !this.state.visible});
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.src).focus();
  },
  server: function(){
    var self = this;
    fetch('http://localhost:3000/link', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        src: ReactDOM.findDOMNode(this.refs.src).value,
        linkInfo: ReactDOM.findDOMNode(this.refs.linkInfo).value,
        tags: ReactDOM.findDOMNode(this.refs.tags).value
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
        self.setState({dynamicSrc: authResult.reduceLink})
      })
  },
  onBtnClickHandler: function(e) {
    this.server()
    e.preventDefault();
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  render: function() {
    var visible = this.state.visible,
        srcIsEmpty = this.state.srcIsEmpty,
        dynamicSrc = this.state.dynamicSrc;
    return (
      <div>
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
            value={dynamicSrc}
            disabled
          />
          <button
            className='add__btn'
            onClick={this.onBtnClickHandler}
            ref='alert_button'
            disabled={srcIsEmpty}
            >
            Сократить
          </button>
        </div>
        <div className = 'more'>
          <a onClick={this.onCheckRuleClick} className="more__window" href="#">
            { (visible ? 'Скрыть' : 'Подробнее') }
          </a>
          <div className={'more-input ' + (visible ? '' : 'none')}>
            <input
              type='text'
              className='more-input__linkInfo'
              placeholder='Информация о ссылке'
              name='linkInfo'
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
      </div>
    );
  }
});

var Link = React.createClass({
    propTypes: {
      data: React.PropTypes.shape({
      click: React.PropTypes.number.isRequired,
      linkInfo: React.PropTypes.string.isRequired,
      reduceLink: React.PropTypes.string.isRequired,
      src: React.PropTypes.string.isRequired,
      tags: React.PropTypes.array.isRequired
    })
  },
  getInitialState: function() {
    return {
      changeCheck: true,
      linkInfo: this.props.data.linkInfo,
      tags: this.props.data.tags
    };
  },
  server: function(){
    var self = this;
    fetch('http://localhost:3000/link', {
      method: 'put',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        src: ReactDOM.findDOMNode(this.refs.show__src).value,
        linkInfo: ReactDOM.findDOMNode(this.refs.show__linkInfo).value,
        tags: ReactDOM.findDOMNode(this.refs.show__tags).value
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
        //self.setState({dynamicSrc: authResult.reduceLink})
      })
  },
  onBtnClickHandler: function(e) {
    this.server()
    e.preventDefault();
    this.setState({ changeCheck : true});
  },
  onFieldChange: function(fieldName, e) {
      this.setState({[''+fieldName]: e.target.value});
      this.setState({ changeCheck : false});
  },
  render: function() {
    var src = this.props.data.src,
        reduceLink = 'http://localhost:3000/' + this.props.data.reduceLink + '/',
        linkInfo = this.state.linkInfo,
        click = this.props.data.click,
        tags = this.state.tags,
        tagsList,
        tagsList_input,
        changeCheck = this.state.changeCheck;
        console.log(linkInfo);

        if (tags.length > 0 && tags[0] != '') {
          tagsList = tags.map(function(item, index) {
            return (
              <div key={index}>
                <a className = 'show-link__tags__search' href="#">{item}</a>
              </div>
            )
          })
          tagsList_input = tags.join(',');
        } else {
          tagsList = <p className='show-link__text'> Список тегов пуст</p>
          tagsList_input = 'Список тегов пуст';
        }
    return(
      <div className = 'show-link'>
        <div className = 'show-link__row'>
          <div className='show-link__src'>
            <p className='show-link__text'>Полная ссылка: </p>
            <input
              type='text'
              className='show-link__src__input'
              name='show-link__src'
              ref='show__src'
              value={src}
              disabled
            />
          </div>
          <div className='show-link__reduceLink'>
            <p className='show-link__text'>Короткая ссылка: </p>
            <input
              type='text'
              className='show-link__reduceLink__input'
              name='show-link__reduceLink'
              ref='show-link__reduceLink'
              value={reduceLink}
              disabled
            />
          </div>
          <div className='show-link__click'>
            <p className='show-link__text'>Количествео кликов по ссылке: </p>
            <input
              type='text'
              className='show-link__click__input'
              name='show-link__click'
              ref='show-link__click'
              value={click}
              disabled
            />
          </div>
          <div className='show-link__linkInfo'>
            <p className='show-link__text'>Информация о ссылке: </p>
            <textarea
              className='show-link__linkInfo__input'
              onChange={this.onFieldChange.bind(this, 'linkInfo')}
              name='show-link__linkInfo'
              ref='show__linkInfo'
            >
              {this.props.data.linkInfo}
            </textarea>
          </div>
          <div className='show-link__tags'>
            <div className = 'show-link__tags__a'>
              <p className='show-link__text'>Tags:  </p>
                {tagsList}
            </div>
            <textarea
              className='show-link__tags__input'
              onChange={this.onFieldChange.bind(this, 'linkInfo')}
              name='show-link__tags'
              ref='show__tags'
            >{tagsList_input}
            </textarea>
          </div>
        </div>
          <button
            className='show-link__btn'
            onClick={this.onBtnClickHandler}
            ref='btm-put'
            disabled={changeCheck}
            >
            Изменить
          </button>
      </div>
    )
  }
});

var AllLinks = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  onCheckRuleClick: function(e) {
    this.setState({visible: !this.state.visible});
  },

  render: function() {
    var data = this.props.data;
    var visible = this.props.visible;
    var allLinks;

    if (data.length > 0) {
      allLinks = data.map(function(item, index) {
        return (
          <div key={index}>
            <Link data={item} />
          </div>
        )
      })
    } else {
      allLinks = <p>Список ссылок пуст</p>
    }

    return(
      <div className={'all-data ' + (visible ? '' : 'none')}>
        {allLinks}
      </div>
    )
  }
});


var Show = React.createClass({
  getInitialState: function() {
    return {
      visible: false,
      links: []
    };
  },
  server: function(){
    var self = this;
    fetch('http://localhost:3000/all-links', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(function(response){
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
          console.error('Error while fetching deficit');
        }
     })
    .then(function(authResult) {
        self.setState({links: authResult.allLinks});
      })
  },
  onCheckRuleClick: function(e) {
    this.setState({visible: !this.state.visible});
    this.server();
  },

  render: function() {
    var visible = this.state.visible,
        links = this.state.links;

    return(

      <div className = 'show'>

        <a onClick={this.onCheckRuleClick} className="show__window" href="#">
          { (visible ? 'Скрыть' : 'Ваши ссылки') }
        </a>
            <AllLinks data={this.state.links} visible = {this.state.visible} />
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
          <Header />
          <Add />
        </div>
            <Show />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
