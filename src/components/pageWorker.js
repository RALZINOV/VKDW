import * as utils from './pageUtils';
import * as constants from './constants';
import { downloadButton, markButton, albumDownloadButton } from './pageElements';

(() => {
  const {
    audioListChanged,
    findNodeWithClass,
    getLocale,
    getNthParentNode,
    getNthSiblingNode,
    hide,
    log,
    prepend,
    show,
    thisNotCurrent,
  } = utils;

  const {
    AUDIO_ROWS_CLASSNAMES,
    DOWNLOAD_BUTTON_CLASSNAME,
    MARK_BUTTON_CLASSNAME,
    VK_AUDIO_ACTS_CLASSNAME,
    bgWorkerExtensionId,
  } = constants;

  let locale;

  function addAudioRowEvents(item) {
    const itemContainerClassName = getNthParentNode(item).className.substr(0, 10);
    const markButtonNode = findNodeWithClass(MARK_BUTTON_CLASSNAME, item);
    let showOverNext = false;
    const elementsNextItemToShow = [
      'wall_audio',
      'post_media',
      'search_res',
    ];

    if (elementsNextItemToShow.indexOf(itemContainerClassName) >= 0) {
      showOverNext = true;
    }

    const siblingToShow = showOverNext ? 2 : 1;
    const vkButton = getNthSiblingNode(markButtonNode, siblingToShow);

    item.addEventListener('mouseleave', () => {
      if (thisNotCurrent(item)) {

        hide(markButtonNode);
        show(vkButton);
      }
    });
  }

  function appendSongDownloadButtons() {

    AUDIO_ROWS_CLASSNAMES.forEach((audioRowClassName) => {
      const audioRowsCollection = document.querySelectorAll(audioRowClassName);

      for (let i = 0; i < audioRowsCollection.length; i++) {
        const item = audioRowsCollection[i];
        const proceeded = findNodeWithClass(DOWNLOAD_BUTTON_CLASSNAME, item);

        if (!proceeded) {
          const vkAudioActionsPanel = findNodeWithClass(VK_AUDIO_ACTS_CLASSNAME, item);

          prepend(vkAudioActionsPanel, markButton(locale));
          prepend(vkAudioActionsPanel, downloadButton(locale));

          addAudioRowEvents(item);
        }
      }
    });
  }

  function appendButtons() {
    if (appendButtons.prevCheckTimestamp < (Date.now() - 1000)) {

      if (audioListChanged()) {
        appendSongDownloadButtons();
      }

      // Append album download buttons
      if (window.location.pathname.substr(1, 5) === 'audio') {
        const albumButtons = document.querySelectorAll('.audio_album_item .audio_album_btns');

        albumButtons.forEach((item) => {
          const vkdwButtons = item.getElementsByClassName('vkdw-download-button');

          if (vkdwButtons.length === 0) {
            item.appendChild(albumDownloadButton(locale));
          }
        });
      }
      appendButtons.prevCheckTimestamp = Date.now();
    }
  }

  (function initVKDW() {
    getLocale(bgWorkerExtensionId)
    .then((response) => {
      locale = response;
    })
    .then(() => {
      appendSongDownloadButtons();

      appendButtons.prevCheckTimestamp = 0;
      appendButtons();

      document.addEventListener('scroll', appendButtons);
      document.addEventListener('keypress', appendButtons);
      document.addEventListener('mousemove', appendButtons);

      log('Greetings :) Now you can download music');
    })
    .catch((e) => {
      log(`Init error: ${e}`, 'error');
    });
  }());

})();
