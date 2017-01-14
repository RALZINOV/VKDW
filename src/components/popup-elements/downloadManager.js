/* global chrome */
import { bgWorkerExtensionId } from '../constants';

const ACTIVE_DOWNLOADS = [];
let UPDATE_TIMEOUT = 0;

function getExtensionDownloads() {
  return new Promise((resolve) => {
    chrome.downloads.search({}, resolve);
  })
    .then((response) => {
      return response.filter((item) => {
        if (item.byExtensionId === bgWorkerExtensionId) {
          return true;
        }

        return false;
      });
    });
}

function getPersentage(bytes, bytesTotal) {
  return Math.round((bytes / bytesTotal) * 100);
}

function toDecimal(num) {
  return Math.round(num * 10) / 10;
}

function bytesToHumanReadable(bytes) {

  if (bytes > 1073741824) {
    return `${toDecimal(bytes / 1073741824)} GB`;

  } else if (bytes > 1048576) {
    return `${toDecimal(bytes / 1048576)} MB`;

  } else if (bytes > 1024) {
    return `${toDecimal(bytes / 1024)} KB`;
  }

  return `${bytes} B`;
}

function transformDownload(downloadItem) {
  const itemName = downloadItem.filename.split('\\').pop().split('.')[0].split(' - ');
  const itemIndex = ACTIVE_DOWNLOADS.indexOf(downloadItem.id);

  if (itemIndex >= 0) {
    if (downloadItem.status !== 'in_progress') {
      ACTIVE_DOWNLOADS.splice(itemIndex, 1);
    }
  }

  // console.log(downloadItem);

  if ((downloadItem.state === 'in_progress') && !downloadItem.paused) {

    ACTIVE_DOWNLOADS.push(downloadItem.id);
  }

  return {
    id: downloadItem.id,
    artist: itemName[0],
    trackName: itemName[1],
    status: (downloadItem.paused && (downloadItem.state !== 'interrupted')) ? 'paused' : downloadItem.state,
    progress: getPersentage(downloadItem.bytesReceived, downloadItem.totalBytes),
    size: bytesToHumanReadable(downloadItem.totalBytes),
  };
}

function sortByStatus(a, b) {
  const statuses = [
    'complete',
    'interrupted',
    'paused',
    'in_progress',
  ];

  const weightA = statuses.indexOf(a.status);
  const weightB = statuses.indexOf(b.status);

  if (weightA > weightB) return -1;
  if (weightA < weightB) return 1;
  return 0;
}

function downloadManager(event, setData) {
  // console.log('Download manager event:', event, setData);

  getExtensionDownloads()
    .then((extDownloads) => {
      return extDownloads.map(transformDownload);
    })
    .then((data) => {
      return data.sort(sortByStatus);
    })
    .then((data) => {
      setData(data);

    })
    .then(() => {
      if (ACTIVE_DOWNLOADS.length > 0) {
        UPDATE_TIMEOUT = setTimeout(() => {
          downloadManager({ reason: 'update' }, setData);
        }, 1000);
      }
    });
}

export default downloadManager;
