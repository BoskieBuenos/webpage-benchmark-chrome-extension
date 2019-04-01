import Benchmarks from "../benchmarks/benchmarks.js";

let body = document.getElementsByTagName('body')[0];
let displayPanel = document.createElement('div');
displayPanel.classList.add('display-panel');
body.appendChild(displayPanel);

displayPanel.innerHTML = "<p>" + Benchmarks.evaluate() + "</p>";

// // Load of html file is not working
// let appendToBody = () => {
//     if (xhr.status !== 200) return;
//     let body = document.getElementsByTagName('body')[0];
//     body.appendChild(xhr.responseText);
// };
//
// let xhr = new XMLHttpRequest();
// let url = chrome.extension.getURL('display-panel/display-panel.html');
// xhr.open('GET', url, true);
// xhr.onreadystatechange = appendToBody;
// xhr.send();