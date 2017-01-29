import React from 'react';
import Button from './Button.jsx';

class Item extends React.Component {

  render() {
    const { data: { artist, trackName, status, progress, totalSize }, erase } = this.props;

    return (
      <div className="item" title="Status">
        <div className={`item__action-button item__action-button--${status}`} />
        <div className="item__title">
          <p className="item__title-artist">{artist}</p>
          <p className="item__title-divider">–</p>
          <p className="item__title-trackname">{trackName}</p>
        </div>

        <div className="item__info">
            <div className="item__info--status">{status}</div>
            <div className="item__info--size">{totalSize}</div>
        </div>

        <Button className="item__actions">
            <div
              className="item__actions--delete"
              title="Delete"
              onClick={erase}
            />
        </Button>

      </div>
    );
  }
}

export default Item;

          // <div className="item__size-info">
          //   {/*
          //     ((status !== 'complete') && (status !== 'interrupted')) ?
          //     <div className="item__progress-bar">
          //       <div style={{ width: `${progress}%` }} />
          //     </div>
          //     : <p>{status}</p>
          //   */}
          //   {}
          // </div>
