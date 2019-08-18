import Benchmarks from "../benchmarks/benchmarks.js";
import {notDisplayPanel} from "../benchmarks/filters.js";

const toObj = (key, value, initObj = {}) => {
    initObj[key] = value;
    return initObj;
};

const observedPerformanceEvents = ['resource'];
const performanceRegistry = observedPerformanceEvents.reduce((registry, entryType) => toObj(entryType, [], registry), {});

const performanceObserver = new PerformanceObserver((list, obj) => {
    let entries = list.getEntries() || [];
    entries.forEach(e => performanceRegistry[e.entryType].push(e));
});

// Observable entry types: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType
performanceObserver.observe({entryTypes: observedPerformanceEvents});

let lastRefresh = 0;

let body = document.getElementsByTagName('body')[0];
let displayPanel = document.createElement('div');
displayPanel.classList.add('wbce-display-panel');
body.appendChild(displayPanel);

let refreshBenchmarks = (mutationsList, observer) => {
    let isNotExtensionChanged = mutationsList.filter(({target}) => notDisplayPanel(target)).length > 0;
    let timespan = Date.now() - lastRefresh;
    if (isNotExtensionChanged && timespan > 100) {
        lastRefresh = Date.now();
        while (displayPanel.firstChild) {
            displayPanel.removeChild(displayPanel.firstChild);
        }

        let displayPanelHeading = document.createElement('p');
        displayPanelHeading.classList.add('wbce-benchmark');
        displayPanelHeading.innerHTML = 'Benchmarks:';
        displayPanel.appendChild(displayPanelHeading);

        let evals = Benchmarks.evaluate(performanceRegistry);
        evals.forEach(p => displayPanel.appendChild(p));
    }
};

let bodyModificationObserver = new MutationObserver(refreshBenchmarks);
refreshBenchmarks([{target: body}]); // init is required for static pages
bodyModificationObserver.observe(body, {childList: true, attributes: true, subtree: true, characterData: true});
