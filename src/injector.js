/* global chrome */

(() => {
  const injectFile = (fileName) => {
    const fileUrl = chrome.extension.getURL(fileName);
    const fileType = fileName.split('.').pop();
    let element;

    if (fileType === 'js') {
      element = document.createElement('script');
      element.type = 'text/javascript';
      element.src = fileUrl;

    } else if (fileType === 'css') {
      element = document.createElement('link');
      element.type = 'text/css';
      element.rel = 'stylesheet';
      element.href = fileUrl;
    }

    document.body.appendChild(element);
  };

  injectFile('workers/pageWorker.js');
  injectFile('styles/page.css');
})();
