import React from 'react';
import Link from './link'

class AllLinks extends React.Component {
  render() {
    let data = this.props.data,
        visible = this.props.visible,
        allLinks;
    const self = this;

    if (data.length > 0) {
      allLinks = data.map(function(item, index) {
        return (
          <div key={index}>
            <Link data={item} updateLinks={self.props.updateLinks}/>
          </div>
        )
      })
    } else {
      allLinks=<p>Список ссылок пуст</p>
    }

    return(
      <div className={'all-data ' + (visible ? '' : 'none')}>
        {allLinks}
      </div>
    )
  }
}

AllLinks.propTypes = {
  data: React.PropTypes.array.isRequired,
  visible: React.PropTypes.bool.isRequired
}

export default AllLinks;
