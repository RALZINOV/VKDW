/* global chrome ajax */

import { removeRestrictedChars, uncheckItemById } from './pageUtils';
import { bgWorkerExtensionId } from './constants';

function getIdsArrayOfMarkedRows() {
  const arr = [];
  const selected = document.querySelectorAll('.vkdw-marked');

  selected.forEach((item) => {
    arr.push(item.dataset.fullId);
  });
  return arr;
}

function getTrackUrlById(tenIdsArr) {
  return new Promise((resolve, reject) => {
    ajax.post('al_audio.php', {
      act: 'reload_audio',
      ids: tenIdsArr.join(','),
    },
      {
        onDone: resolve,
        onFail: reject,
      });
  });
}

export function getAlbumById(ownerId, albumId) {
  return new Promise((resolve, reject) => {
    ajax.post('al_audio.php', {
      act: 'load_silent',
      album_id: albumId,
      owner_id: ownerId,
    }, {
      onDone: resolve,
      onFail: reject,
    });
  });
}

export function downloadItemsById(idsArray, albumTitle) {
  const songData = {
    rawSongUrl: '',
    songFileName: '',
    artist: '',
    trackName: '',
    albumName: '',
  };

  const arrOfIdsByTen = [];

  while (idsArray.length > 0) {
    arrOfIdsByTen.push(idsArray.splice(0, 10));
  }

  if (albumTitle) {
    songData.albumName = albumTitle || '';
  }

  arrOfIdsByTen.forEach((tenIdsArr) => {
    getTrackUrlById(tenIdsArr)
      .then((response) => {
        response.forEach((trackData) => {

          const songId = `${trackData[1]}_${trackData[0]}`;
          const songUrl = trackData[2];
          const songAuthor = removeRestrictedChars(trackData[4].replace(' ', ''));
          const songName = removeRestrictedChars(trackData[3]);
          const songExtension = '.mp3';

          songData.type = 'download';
          songData.rawSongUrl = songUrl;
          songData.songFileName = `${songAuthor} - ${songName}${songExtension}`;
          songData.artist = songAuthor;
          songData.trackName = songName;

          chrome.runtime.sendMessage(bgWorkerExtensionId, songData, (extResponse) => {
            if (extResponse.status === 'OK') {
              uncheckItemById(songId);
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export function downloadMarked() {
  const idsArray = getIdsArrayOfMarkedRows();

  downloadItemsById(idsArray);
}
