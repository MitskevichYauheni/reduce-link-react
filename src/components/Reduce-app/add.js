import React from 'react';

class Add extends React.Component {
  constructor(){
    super();
    this.state = {
      visible: false,
      srcIsEmpty: true,
      dynamicSrc: ''
    }
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
  }
  onCheckRuleClick(e) {
    this.setState({visible: !this.state.visible});
  }
  componentDidMount() {
    (this.refs.src).focus();
  }
  server(){
    fetch('http://localhost:3000/link', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        src: (this.refs.src).value,
        linkInfo: (this.refs.linkInfo).value,
        tags: (this.refs.tags).value
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({dynamicSrc: authResult.reduceLink})
      })
  }
  onBtnClickHandler(e) {
    this.server()
    e.preventDefault();
  }
  onFieldChange(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  }
  render() {
    let visible = this.state.visible,
        srcIsEmpty = this.state.srcIsEmpty,
        dynamicSrc = this.state.dynamicSrc;

    return (
      <div className = 'add-link' >
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
            className='little-input__btn'
            onClick={this.onBtnClickHandler}
            ref='alert_button'
            disabled={srcIsEmpty}
            >
            Сократить
          </button>
        </div>
        <div className = 'more'>
          <a onClick={this.onCheckRuleClick} className="more__window">
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
}

export default Add;
