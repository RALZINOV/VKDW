/* global chrome */
import React from 'react';
import downloadManager, { openDownloads, clearExtensionDownloads, eraseItem } from './downloadManager';

class DataProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  handleData = (data) => {
    this.setState({ data });
  }

  refreshList = () => {
    downloadManager({ reason: 'update' }, this.handleData);
  }

  handleClearDownloads = () => {
    clearExtensionDownloads(this.setState({ data: [] }));
  }

  handleEraseItemData = (id) => {
    eraseItem(id, this.handleData);
  }

  componentWillMount() {
    chrome.downloads.onChanged.addListener((event) => {
      downloadManager(event, this.handleData);
    });

    downloadManager(null, this.handleData);
  }

  componentWillUnmount() {
    chrome.downloads.onChanged.removeListener(downloadManager);
  }

  render() {
    const childProps = {
      data: this.state.data,
      refreshList: this.refreshList,
      clearDownloads: this.handleClearDownloads,
      openDownloads,
      eraseItem: this.handleEraseItemData,

    };

    return React.cloneElement(this.props.children, childProps);
  }
}

export default DataProvider;

