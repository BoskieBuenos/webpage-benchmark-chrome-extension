//import Benchmarks from "./benchmarks/benchmarks";
//import DisplayPanel from "./display-panel/display-panel";

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.executeScript({
        file: './display-panel/display-panel.js'
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
