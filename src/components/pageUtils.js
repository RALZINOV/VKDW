/* global chrome */

export function show(item) {
  item.style.display = 'block';
}

export function hide(item) {
  item.style.display = 'none';
}

export function getNthParentNode(item, parentNodeCount = 1) {
  let node = item;

  for (let i = 0; i < parentNodeCount; i++) {
    node = node.parentNode;
  }

  return node;
}

export function getNthSiblingNode(item, childNodeCount = 1) {
  let node = item;

  for (let i = 0; i < childNodeCount; i++) {
    node = node.nextElementSibling;
  }

  return node;
}

export function findNodeWithClass(nodeClassName, item = document) {
  return item.getElementsByClassName(nodeClassName)[0];
}

export function hasClass(item, className) {
  return [].indexOf.call(item.classList, className) >= 0;
}

export function prepend(parent, child) {
  parent.insertBefore(child, parent.firstChild);
}

export function addClassName(item, className) {
  const classNames = item.className.split(' ');
  const index = classNames.indexOf(className);

  if (index < 0) {
    classNames.push(className);
  }

  item.className = classNames.join(' ');
}

export function removeClassName(item, className) {
  const classNames = item.className.split(' ');
  const index = classNames.indexOf(className);
  if (index >= 0) {
    classNames.splice(index, 1);
  }

  item.className = classNames.join(' ');
}

export function toggleClassName(item, className) {
  const classNames = item.className.split(' ');
  const index = classNames.indexOf(className);

  if (index < 0) {
    addClassName(item, className);
  } else {
    removeClassName(item, className);
  }
}

export function log(string, type = 'log') {
  console[type](string);
}

export function createNode(className, tooltipTitle, eventsHandlers) {
  const div = document.createElement('div');
  div.className = className;
  div.dataset.nodrag = 1;

  if (tooltipTitle) {
    div.dataset.tooltip = tooltipTitle;
  }

  if (eventsHandlers) {
    for (const key in eventsHandlers) {
      if ({}.hasOwnProperty.call(eventsHandlers, key)) {
        div.addEventListener(key, eventsHandlers[key](div));
      }
    }
  }

  return div;
}

export function trackEndingsGenerator(number, locale) {
  let result;
  let stringNumber;
  let lastTwoDigits;

  if (number > 9) {

    if (number < 21) {
      result = locale.tracksTitle[2]; // 'треков';
    } else if (number < 99) {
      const lastNumber = number % 10;
      result = trackEndingsGenerator(lastNumber, locale);
    } else {
      stringNumber = String(number);
      lastTwoDigits = Number(stringNumber.slice(stringNumber.length - 2, stringNumber.length));
      result = trackEndingsGenerator(lastTwoDigits, locale);
    }
  } else {
    switch (number) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        result = locale.tracksTitle[2]; // 'треков';
        break;
      case 1:
        result = locale.tracksTitle[0]; // 'трек';
        break;
      case 2:
      case 3:
      case 4:
        result = locale.tracksTitle[1]; // 'трека';
        break;
      default:
        result = locale.tracksTitle[0]; // 'трек';
    }
  }
  return result;
}

export function removeRestrictedChars(str) {
  let result = str;
  if (str !== undefined) {
    const restrictedChars = [':', '~', '?', '*', '/', '\\', '|', '<', '>'];

    for (let i = 0; i < restrictedChars.length; i++) {
      result = result.split(restrictedChars[i]).join('');
    }
  }
  return result;
}

// Specific utils
export function thisNotCurrent(item) {
  const audioRow = getNthParentNode(item, 4);

  return !hasClass(audioRow, 'audio_row_current');
}

export function uncheckMarked() {
  const markedRows = document.querySelectorAll('.vkdw-marked');

  markedRows.forEach((item) => {
    removeClassName(item, 'animated');
    removeClassName(item, 'clicked');
    removeClassName(item, 'vkdw-marked');
  });
}

export function uncheckItemById(itemId) {
  const item = document.getElementById(`audio_${itemId}`);

  removeClassName(item, 'animated');
  removeClassName(item, 'clicked');
  removeClassName(item, 'vkdw-marked');
}

// Chrome utils
export function getLocale(bgWorkerExtensionId) {
  return new Promise((resolve, reject) => {
    const langId = window.vk.lang;

    chrome.runtime.sendMessage(bgWorkerExtensionId, { type: 'getLocale', langId }, (response) => {
      if (response) {
        resolve(response);
      } else {
        reject('Cannot fetch localisation from bgWorker', response);
      }
    });
  });

}

export function audioListChanged() {

  const currentAudioListLength = document.getElementsByClassName('audio_row').length;
  const proceededAudioItems = document.getElementsByClassName('vkdw-download-button').length;
  const prevAudioListLength = audioListChanged.prevAudioListLength;

  audioListChanged.prevAudioListLength = currentAudioListLength;

  return (
    (currentAudioListLength !== proceededAudioItems) ||
    (currentAudioListLength !== prevAudioListLength)
  );
}

export function removeElement(element) {
  const item = document.querySelectorAll(element)[0];
  item.parentNode.removeChild(item);
}

