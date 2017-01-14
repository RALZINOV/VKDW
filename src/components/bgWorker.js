/* global chrome */
import LOCALE from './locale';

const data = [
  {
    id: 1,
    artist: 'Motley Crue',
    trackName: 'Goin\' Out Swingin\'',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'A Beast Am I',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Across The Rainbow Bridge',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Aerials [System Of A Down Cover] [Bonus Track]',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Amon Amarth',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'An Ancient Sign Of Coming Storm',
  },
  {
    id: 1,
    artist: 'Motley Crue',
    trackName: 'Goin\' Out Swingin\'',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'A Beast Am I',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Across The Rainbow Bridge',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Aerials [System Of A Down Cover] [Bonus Track]',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Amon Amarth',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'An Ancient Sign Of Coming Storm',
  },
  {
    id: 1,
    artist: 'Motley Crue',
    trackName: 'Goin\' Out Swingin\'',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'A Beast Am I',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Across The Rainbow Bridge',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Aerials [System Of A Down Cover] [Bonus Track]',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'Amon Amarth',
  },
  {
    id: 1,
    artist: 'Amon Amarth',
    trackName: 'An Ancient Sign Of Coming Storm',
  },
];

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

  chrome.downloads.download({
    url: request.rawSongUrl,
    filename: folderName + stringDecoder(request.songFileName),

  }, (downloadId) => {

    if (downloadId === undefined) {
      console.error(`Error: Cannot download. Status: ${chrome.runtime.lastError}`);

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

chrome.browserAction.setPopup({
  popup: '../pages/popup.html',
});

console.log('Ready');
