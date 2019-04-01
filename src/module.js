// https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension?rq=1
const dependenciesScript = document.createElement('script');
dependenciesScript.setAttribute('type', 'module');
dependenciesScript.setAttribute('src', chrome.extension.getURL('display-panel/display-panel.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(dependenciesScript, head.lastChild);
