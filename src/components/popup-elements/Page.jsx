import React from 'react';
import Item from './Item.jsx';

class Page extends React.Component {
  render() {
    const { data, bgWorker } = this.props;

    return (
      <div className="app-wrap">
        <header>
          <img className="header__logo" src="../img/modal_logo.png" alt="VK" />
          <p className="header__title">VKDW</p>
        </header>
        <div className="container">
          {
            data.map((itemData, index) => {
              return (
                <Item data={itemData} key={`item_${index}`}/>
              );
            })
          }
        </div>
        <footer>

        </footer>
      </div>
    );
  }
}

export default Page;
