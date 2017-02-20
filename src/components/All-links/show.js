import React from 'react';
import AllLinks from './all-links';

class Show extends React.Component {
  constructor(){
    super();
    this.state = {
      firstBoot: true,
      links: []
    }
  }
  server(){
    fetch('http://localhost:3000/all-links-users', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.ok ? response.json() : console.error('Error while fetching deficit'))
    .then(authResult => {
      console.log(authResult)
        this.setState({links: authResult.allLinks});
      })
  }
  firstBoot(e){
    if(this.state.firstBoot){
      this.server();
      this.setState({ firstBoot: false })
    }
  }

  render() {
    this.firstBoot();

    return(
      <div className = 'show'>
        <AllLinks data={this.state.links} />
      </div>
    )
  }
};


//const Show = () => <div><h1>Show</h1></div>

export default Show;
