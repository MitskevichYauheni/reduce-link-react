import React from 'react';
import AllLinks from './all-links'

class Show extends React.Component {
  constructor(){
    super();
    this.state = {
      visible: false,
      links: []
    }
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
  }
  server(e) {
    fetch('http://localhost:3000/all-links', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
        this.setState({links: authResult.allLinks});
      })
  }
  onCheckRuleClick(e) {
    this.setState({visible: !this.state.visible});
    this.server(e);
  }

  render() {
    let visible = this.state.visible;

    return(
      <div className='show'>
        <a onClick={this.onCheckRuleClick} className="show__window">
          { (visible ? 'Скрыть' : 'Ваши ссылки') }
        </a>
          <AllLinks data={this.state.links} visible={this.state.visible} updateLinks={this.server.bind(this)}/>
      </div>
    )
  }
}

export default Show;

//<AllLinks data={this.state.links} visible = {this.state.visible} />
