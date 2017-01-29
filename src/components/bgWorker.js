/* global chrome */
import LOCALE from './locale';

function stringDecoder(encodedString) {
  stringDecoder.decodeBox.innerHTML = encodedString;
  const decoded = stringDecoder.decodeBox.value;
  return decoded;
}
stringDecoder.decodeBox = document.createElement('textarea');

function handleDownloadMessage(request, sendResponse) {
  const time = new Date();
  const currentDate = time.toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).replace(/\./g, '-');

  const path = request.albumName ? `${request.albumName}/` : '';
  const folderName = `VKDW_${currentDate}/${path}`;

  //chrome.downloads.setShelfEnabled(false);

  chrome.downloads.download({
    url: request.rawSongUrl,
    filename: folderName + stringDecoder(request.songFileName),

  }, (downloadId) => {

    if (downloadId === undefined) {
      console.error(`Error: Cannot download. Status: ${chrome.runtime.lastError}`);
        //chrome.downloads.setShelfEnabled(true);

    } else {
      console.info(`Start download ${downloadId}`);
    }
  });

  sendResponse({
    status: 'OK',
  });
}

function handleGetLocaleMessage(langId, responseCallback) {
  responseCallback(LOCALE[langId]);
}

chrome.runtime.onMessageExternal.addListener(
  (request, sender, responseCallback) => {

    if (request.type === 'download') {
      handleDownloadMessage(request, responseCallback);

    } else if (request.type === 'getLocale') {
      handleGetLocaleMessage(request.langId, responseCallback);
    }

  });

// chrome.browserAction.setPopup({
//   popup: '../pages/popup.html',
// });

console.log('Ready');
