import React from 'react';
import ReadLink from './readlink'

class Link extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      changeCheck: true,
      linkInfo: this.props.data.linkInfo,
      tags: this.props.data.tags,
      visibilityForTagsSearch: false,
      searchForTag: []
    }
    this.onBtnClickDelete = this.onBtnClickDelete.bind(this);
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
  }
  serverLinkChange(){
    fetch('http://localhost:3000/link', {
      method: 'put',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        src: (this.refs.show__src).value,
        linkInfo: (this.refs.show__linkInfo).value,
        tags: (this.refs.show__tags).value
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({tags: authResult})
      })
  }
  serverLinkDelete(){
    fetch('http://localhost:3000/link', {
      method: 'delete',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        src: (this.refs.show__src).value,
        reduceLink: (this.refs.show__reduceLink).value,
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        //this.setState({ deleteLink: true })
        this.props.updateLinks(this);
      })
  }
  onBtnClickHandler(e) {
    this.serverLinkChange()
    e.preventDefault();
    this.setState({ changeCheck : true});
  }
  onBtnClickDelete(e) {
    e.preventDefault();
    this.serverLinkDelete();
  }
  onBtnClickSearch(name){
    fetch('http://localhost:3000/tag', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        tag: name
      })
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({searchForTag: authResult});
        this.setState({visibilityForTagsSearch: true})
      })
  }
  onFieldChange(fieldName, e) {
      this.setState({[''+fieldName]: e.target.value});
      this.setState({ changeCheck : false});
  }
  onCheckRuleClick(e) {
    this.setState({visibilityForTagsSearch: !this.state.visibilityForTagsSearch});
    this.setState({searchForTag: []});
  }


  render() {
    let src = this.props.data.src,
        reduceLink = 'http://localhost:3000/' + this.props.data.reduceLink + '/',
        linkInfo = this.state.linkInfo,
        click = this.props.data.click,
        tags = this.state.tags,
        tagsList,
        tagsList_input,
        changeCheck = this.state.changeCheck,
        searchForTag = this.state.searchForTag,
        visibilityForTagsSearch = this.state.visibilityForTagsSearch,
        allLinks;
    let self = this;

    if (searchForTag.length > 0) {
      allLinks = searchForTag.map(function(item, index) {
        return (
          <div key={index}>
              <ReadLink data={item} />
          </div>
        )
      })
    } else {
      allLinks = <p>Список ссылок пуст</p>
     }

    if (tags.length > 0 && tags[0] !== '') {
      tagsList = tags.map(function(item, index) {
        return (
          <div key={index}>
            <a className='show-link__tags__search' onClick={(self.onBtnClickSearch.bind(self, item))} ref='show__tag'>
              {item}
            </a>
          </div>
        )
      })
      tagsList_input = tags.join(',');
    } else {
      tagsList=<p className='show-link__text'> Список тегов пуст</p>
      tagsList_input='Список тегов пуст';
    }

    return(
      <div>
        <div className='show-link '>
          <div className='show-link__btn show-link__btn__right'>
            <button
              className='show-link__btn__delete'
              onClick={this.onBtnClickDelete}
              ref='btm-delete'
              >
              ×
            </button>
          </div>
          <div className='show-link__row'>
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
                ref='show__reduceLink'
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
                defaultValue={linkInfo}
              >
              </textarea>
            </div>
            <div className='show-link__tags'>
              <div className='show-link__tags__row'>
                <div className='show-link__tags__a'>
                  <p className='show-link__text'>Tags:  </p>
                </div>
                <textarea
                  className='show-link__tags__input'
                  onChange={this.onFieldChange.bind(this, 'linkInfo')}
                  name='show-link__tags'
                  ref='show__tags'
                  defaultValue={tagsList_input}
                >
                </textarea>
              </div>
              <div className='show-link__tags__row-search'>
                {tagsList}
              </div>
            </div>
          </div>
          <div className='show-link__btn'>
            <button
              className='show-link__btn__change'
              onClick={this.onBtnClickHandler}
              ref='btm-put'
              disabled={changeCheck}
              >
              Изменить
            </button>
            </div>
        </div>
        <div>
        <a onClick={this.onCheckRuleClick} className="show__window">
          { (visibilityForTagsSearch ? 'Скрыть' : '') }
        </a>
          <div className={'show-link-search ' +  (visibilityForTagsSearch ? '' : 'none')}>
            {allLinks}
          </div>
        </div>
      </div>
    )
  }
}

Link.propTypes = {
  data: React.PropTypes.shape({
    click: React.PropTypes.number.isRequired,
    linkInfo: React.PropTypes.string.isRequired,
    reduceLink: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    tags: React.PropTypes.array.isRequired
  })
}

export default Link;
