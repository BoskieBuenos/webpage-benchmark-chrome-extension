//import Benchmarks from "./benchmarks/benchmarks";
//import DisplayPanel from "./display-panel/display-panel";

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.executeScript({
        file: './display-panel/display-panel.js' // FIXME not working, maybe onInstalled isn't right hook
    }, (result) => {
        let e = chrome.runtime.lastError;
        if (e !== undefined) { // in chrome's extensions tab
            console.log(result);
            return;
        }
    });
});

//chrome.runtime.onMessage.addListener(
//    function (message, callback) {
//
//        if (message == "runContentScript")
//        {
//            chrome.tabs.executeScript({
//                file: 'contentScript.js'
//            });
//        }
//    });
