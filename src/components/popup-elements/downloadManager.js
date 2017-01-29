/* global chrome */
import { bgWorkerExtensionId } from '../constants';

const ACTIVE_DOWNLOADS = [];

function getExtensionDownloads() {
  return new Promise((resolve, reject) => {
    chrome.downloads.search({}, (result, error) => {

      const items = result.filter((item) => {
        return item.byExtensionId === bgWorkerExtensionId;
      });

      if (items.length > 0) {
        resolve(items);
      } else {
        reject(result, error);
      }
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

  if ((itemIndex >= 0) && (downloadItem.status !== 'in_progress')) {
    ACTIVE_DOWNLOADS.splice(itemIndex, 1);
  }

  if ((downloadItem.state === 'in_progress') && !downloadItem.paused) {

    ACTIVE_DOWNLOADS.push(downloadItem.id);
  }

  return {
    id: downloadItem.id,
    artist: itemName[0],
    trackName: itemName[1],
    status: (downloadItem.paused && (downloadItem.state !== 'interrupted')) ? 'paused' : downloadItem.state,
    progress: getPersentage(downloadItem.bytesReceived, downloadItem.totalBytes),
    totalSize: bytesToHumanReadable(downloadItem.totalBytes),
    sizeDownloaded: 0,
  };
}

function sortByStatus(a, b) {
  const statuses = [
    'in_progress',
    'paused',
    'complete',
    'interrupted',
  ];

  const weightA = statuses.indexOf(a.status);
  const weightB = statuses.indexOf(b.status);

  if (weightA > weightB) return 1;
  if (weightA < weightB) return -1;
  return 0;
}

export default function downloadManager(event, setData) {
  getExtensionDownloads()
    .then((extDownloads) => {
      return extDownloads.map(transformDownload);
    })
    .then((data) => {
      return data.sort(sortByStatus);
    })
    .then((data) => {
      console.log('data', data)
      setData(data);
    })
    .then(() => {
      console.log('update', ACTIVE_DOWNLOADS);

      if (ACTIVE_DOWNLOADS.length > 0) {
        setTimeout(() => {
          downloadManager({ reason: 'update' }, setData);
        }, 1000);
      } else {
        chrome.downloads.setShelfEnabled(true);
      }

    })
    .catch((e) => {
      console.log('No items found', e);
      setData({
        data: [],
      });
    });
}

downloadManager.ACTIVE_DOWNLOADS = ACTIVE_DOWNLOADS;

export function eraseItem(id, setData) {
  const erase = () => {
    return new Promise((resolve) => {
      chrome.downloads.erase({ id }, (result) => {
          resolve(result);
        });
    });
  };

  erase()
  .then((response) => {
    if (response.indexOf(id) >= 0) {
      downloadManager(null, setData);
    }
  });
}

export function openDownloads() {
  chrome.downloads.showDefaultFolder();
}

export function clearExtensionDownloads(setData) {
  const search = () => {
    return new Promise((resolve, reject) => {
      chrome.downloads.search({}, (result) => {
        const items = result.filter((item) => {
          return item.byExtensionId === bgWorkerExtensionId;
        });

        if (items.length > 0) {
          resolve(items);
        } else {
          reject();
        }
      });
    });
  };

  search()
    .then((extensionDownloads) => {
      extensionDownloads.forEach((item) => {
        eraseItem(item.id);
      });

      setData({
        data: [],
      });
    })
    .catch(() => {
      console.log('List is empty');
    });
}
