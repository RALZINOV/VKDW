import React from 'react';

class Item extends React.Component {
  render() {
    const { artist, trackName, status, progress, size } = this.props.data;

    // console.log(this.props.data)

    return (
      <div className="item" title="Status">
        <div className={`item__status item__status--${status}`} />
        <div className="item__title">
          <p className="item__title-artist">{artist}</p>
          <p className="item__title-divider">–</p>
          <p className="item__title-trackname">{trackName}</p>
        </div>

        <div className="item__size">
          <div className="item__size-info">
            {
              ((status !== 'complete') && (status !== 'interrupted')) ?
              <div className="item__progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              : <p>{status}</p>
            }
          </div>
          <p>
            {size}
          </p>
          <div className="item__actions">
            <div className="item__actions--delete" title="Delete" />
          </div>
        </div>

      </div>
    );
  }
}

export default Item;
