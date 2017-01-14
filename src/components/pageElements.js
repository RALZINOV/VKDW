/* global showTooltip ap */
import * as utils from './pageUtils';
import * as constants from './constants';
import { downloadMarked, downloadItemsById, getAlbumById } from './downloadUtils';

const {
  addClassName,
  createNode,
  getNthParentNode,
  getNthSiblingNode,
  findNodeWithClass,
  hide,
  removeClassName,
  toggleClassName,
  thisNotCurrent,
  show,
  uncheckMarked,
  prepend,
  trackEndingsGenerator,
} = utils;

const {
  ALBUM_DOWNLOAD_BUTTON_CLASSNAME,
  DOWNLOAD_BUTTON_CLASSNAME,
  MARK_BUTTON_CLASSNAME,
} = constants;

let currBtnTimeout;

function hideNextOrOverNextButton(item) {
  let hideOverNext = false;

  const containerClassName = getNthParentNode(item, 5).className.substr(0, 10);

  if (containerClassName === 'wall_audio') {
    hideOverNext = true;
  } else if (containerClassName === 'post_media') {
    hideOverNext = true;
  } else if (containerClassName === 'search_res') {
    hideOverNext = true;
  }

  return hideOverNext;
}

export function downloadButton(locale) {
  return createNode(
    DOWNLOAD_BUTTON_CLASSNAME,
    locale.downloadTitle,
    {
      click: (element) => () => {
        const container = getNthParentNode(element, 4);

        addClassName(container, 'vkdw-marked');
        addClassName(element, 'clicked');

        setTimeout(() => {
          addClassName(container, 'animated');
        }, 100);

        downloadMarked();
      },

      mouseenter: (element) => () => {
        const hideOverNext = hideNextOrOverNextButton(element);
        const markButtonNode = getNthSiblingNode(element);
        const siblingToHide = hideOverNext ? 3 : 2; // If hideOverNext, hide 3rd sibling, else 2nd
        const vkButtonNode = getNthSiblingNode(element, siblingToHide);

        window.clearTimeout(currBtnTimeout);
        addClassName(element, 'tooltipped');

        setTimeout(() => {
          addClassName(element, 'animated');
        }, 100);

        if (thisNotCurrent(element)) {
          hide(vkButtonNode);
          show(markButtonNode);
        }
      },

      mouseleave: (element) => () => {
        const markButtonNode = getNthSiblingNode(element);
        const siblingToShow = hideNextOrOverNextButton(element) ? 3 : 2; // If hideOverNext, hide 3rd sibling, else 2nd
        const vkButtonNode = getNthSiblingNode(element, siblingToShow);

        removeClassName(element, 'animated');
        removeClassName(element, 'clicked');

        setTimeout(() => {
          removeClassName(element, 'tooltipped');
        }, 100);

        currBtnTimeout = setTimeout(() => {
          if (thisNotCurrent(element)) {
            hide(markButtonNode);
            show(vkButtonNode);
          }
        }, 600);
      },

    });
}

export function markButton(locale) {
  return createNode(
    MARK_BUTTON_CLASSNAME,
    locale.markButtonTitle, {
      click: (element) => () => {
        const container = getNthParentNode(element, 4);
        toggleClassName(container, 'vkdw-marked');

        setTimeout(() => {
          toggleClassName(container, 'animated');
        }, 100);
      },

      mouseenter: (element) => () => {
        window.clearTimeout(currBtnTimeout);
        addClassName(element, 'tooltipped');

        setTimeout(() => {
          addClassName(element, 'animated');
        }, 100);
      },

      mouseleave: (element) => () => {
        const hideOverNext = hideNextOrOverNextButton(element);
        const siblingToShow = hideOverNext ? 2 : 1; // If hideOverNext, hide 2rd sibling, else 1nd
        const vkButtonNode = getNthSiblingNode(element, siblingToShow);

        removeClassName(element, 'animated');
        removeClassName(element, 'clicked');

        setTimeout(() => {
          removeClassName(element, 'tooltipped');
        }, 100);

        currBtnTimeout = setTimeout(() => {
          if (thisNotCurrent(element)) {
            show(vkButtonNode);
            hide(element);
          }
        }, 600);
      },

    });
}

const hideModal = () => {
  hide(findNodeWithClass('dialog-overlay'));
  hide(findNodeWithClass('bg-overlay'));
};

const createElement = (nodeName, className, html, onclick) => {
  const element = document.createElement(nodeName);
  element.className = className;

  if (html) {
    element.innerHTML = html;
  }

  if (onclick) {
    element.onclick = onclick;
  }

  return element;
};

export function confirmModal(counterText, locale, albumItemsIds) {
  const closeModal = () => {
    hideModal();
    uncheckMarked();
  };

  const modal = createElement('div', 'vkdw-modal');
  const bgOverlay = createElement('div', 'bg-overlay', null, closeModal);
  const dialog = createElement('div', 'dialog-overlay');
  const bgOverlayHeader = createElement('header', 'bg-overlay-header');
  const bgOverlayHeaderLogo = createElement('header', 'bg-overlay-header-logo');
  const bgOverlayHeaderTitle = createElement('div', 'bg-overlay-header-title', locale.downloadAlbumButtonCaption);

  const dialogText = `
      ${locale.youAboutToDownload} 
      <span class="vkdw-tracks-number">${counterText || locale.aLotOfTracks}</span>, 
      ${locale.thisCanTakeSomeTime}.<br>
      ${locale.areYouShure}
    `;

  const dialogParagraph = createElement('p', '', dialogText);
  const dialogConfirmWrap = createElement('p', 'vkdw-submit-wrap');
  const dialogConfirmButton = createElement(
    'button',
    'vkdw-submit flat_button',
    locale.submitButtonLabel,
    () => {
      hideModal();
      if (albumItemsIds.length) {
        downloadItemsById(albumItemsIds);
      }
    });

  const dialogCancelButton = createElement(
    'button',
    'vkdw-submit flat_button',
    locale.cancelButtonLabel,
    closeModal);

  modal.appendChild(bgOverlay);

  bgOverlayHeader.appendChild(bgOverlayHeaderLogo);
  bgOverlayHeader.appendChild(bgOverlayHeaderTitle);

  dialog.appendChild(bgOverlayHeader);
  dialog.appendChild(dialogParagraph);

  dialogConfirmWrap.appendChild(dialogConfirmButton);
  dialogConfirmWrap.appendChild(dialogCancelButton);

  dialog.appendChild(dialogConfirmWrap);

  modal.appendChild(dialog);

  return modal;
}

function showModal(tracksIds, locale) {
  if (!findNodeWithClass('vkdw-modal')) {
    const counterText = `${tracksIds.length} ${trackEndingsGenerator(tracksIds.length, locale)}`;
    const modal = confirmModal(counterText, locale, tracksIds);
    const audioRowsContainer = findNodeWithClass('audio_rows_header');

    prepend(audioRowsContainer, modal);
  }

  show(findNodeWithClass('bg-overlay'));
  show(findNodeWithClass('dialog-overlay'));
}

function downloadAlbum(ownerId, albumId, albumTitle, locale) {
  getAlbumById(ownerId, albumId)
    .then((response) => {
      const tracksIds = [];

      response.list.forEach((item) => {
        tracksIds.push(`${item[1]}_${item[0]}`);
      });

      if (tracksIds.length > 15) {
        showModal(tracksIds, locale);
      } else {
        downloadItemsById(tracksIds, albumTitle);
      }
    })
    .catch((error) => {
      console.error('Cannot fetch album data', error);
    });
}

export function albumDownloadButton(locale) {
  return createNode(
    ALBUM_DOWNLOAD_BUTTON_CLASSNAME,
    locale.downloadAlbumButtonCaption,
    {
      mouseover: (element) => () => {
        showTooltip(element, {
          text: locale.downloadAlbumButtonCaption,
          black: 1,
          shift: [10, 6, 0],
          needLeft: 1,
          appendParentCls: '_ui_rmenu_sublist',
        });
      },

      click: (element) => () => {
        const albumIds = getNthParentNode(element, 3).href.match(/.+audios(\d+).+album_id=(\d+)/);
        const albumTitle = findNodeWithClass('audio_album_title', getNthParentNode(element, 2)).innerHTML;
        const [, ownerId, albumId] = albumIds;

        downloadAlbum(ownerId, albumId, albumTitle, locale);
      },
    });
}
