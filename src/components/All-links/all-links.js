import React from 'react';
import ReadLink from './readlink';

class AllLinks extends React.Component {

  render() {
    let data = this.props.data,
        allLinks;

    if (data.length > 0) {
      allLinks = data.map(function(item, index) {
        return (
          <div key={index}>
            <ReadLink data={item} />
          </div>
        )
      })
    } else {
      allLinks = <p>Список ссылок пуст</p>
    }

    return(
      <div className='all-data'>
        {allLinks}
      </div>
    )
  }
};

AllLinks.propTypes = {
  data: React.PropTypes.array.isRequired
}
export default AllLinks;
