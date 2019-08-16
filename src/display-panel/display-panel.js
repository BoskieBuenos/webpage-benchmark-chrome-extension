import Benchmarks from "../benchmarks/benchmarks.js";

let body = document.getElementsByTagName('body')[0];
let displayPanel = document.createElement('div');
displayPanel.classList.add('wbce-display-panel');
body.appendChild(displayPanel);

let refreshBenchmarks = (mutationsList, observer) => {
    if (mutationsList.some(({ target }) => target !== displayPanel)) {
        while (displayPanel.firstChild) {
            displayPanel.removeChild(displayPanel.firstChild);
        }

        let displayPanelHeading = document.createElement('p');
        displayPanelHeading.classList.add('wbce-benchmark');
        displayPanelHeading.innerHTML = 'Benchmarks:';
        displayPanel.appendChild(displayPanelHeading);

        let evals = Benchmarks.evaluate();
        evals.forEach(p => displayPanel.appendChild(p));
    }
};

let bodyModificationObserver = new MutationObserver(refreshBenchmarks);
refreshBenchmarks([{target: body}]); // init is required for static pages
bodyModificationObserver.observe(body, { childList: true, attributes: true, subtree: true, characterData: true });

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