/* global chrome */
import React from 'react';
import downloadManager from './downloadManager';

class DataProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  handleData(data) {
    this.setState({ data });
  }

  componentWillMount() {
    chrome.downloads.onChanged.addListener((event) => {
      downloadManager(event, this.handleData.bind(this));
    });

    downloadManager(null, this.handleData.bind(this));
  }

  componentWillUnmount() {
    chrome.downloads.onChanged.removeListener(downloadManager);
  }

  render() {
    const { data } = this.state;

    const bgWorker = chrome.extension.connect({ name: 'popup' });

    const childProps = {
      data,
      bgWorker,
    };

    return React.cloneElement(this.props.children, childProps);
  }
}

export default DataProvider;

