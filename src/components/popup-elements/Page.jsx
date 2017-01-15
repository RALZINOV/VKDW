import React from 'react';
import Item from './Item.jsx';
import Button from './Button.jsx';

class Page extends React.Component {

  handleEraseItem = (id) => () => {
    this.props.eraseItem(id);
  }

  render() {
    const { data, refreshList, openDownloads, clearDownloads } = this.props;

    return (
      <div className="app-wrap">
        <header>
          <Button
            title="Open folder"
            className="header__logo"
            onClick={openDownloads}
          >
            <img className="header__logo-image" src="../img/folder.svg" alt="VK" />
          </Button>
          <p className="header__title">VKDW Download manager</p>
          <Button
            className="header__title-button"
            onClick={clearDownloads}
          >
            Очистить список
          </Button>
        </header>
        <div className={`container${!data.length ? '--empty-list' : ''}`}>
          {
            (data.length > 0) && data.map((itemData, index) => {
              return (
                <Item
                  data={itemData}
                  refreshList={refreshList}
                  erase={this.handleEraseItem(itemData.id)}
                  key={`item_${index}`}
                />
              );
            })
          }
          {
            !data.length &&
            <div>No active downloads</div>
          }
        </div>
        <footer>

        </footer>
      </div>
    );
  }
}

export default Page;
