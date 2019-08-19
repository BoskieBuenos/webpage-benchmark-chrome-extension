import Benchmarks from "../benchmarks/benchmarks.js";
import {notDisplayPanel} from "../benchmarks/filters.js";

const toObj = (key, value, initObj = {}) => {
    initObj[key] = value;
    return initObj;
};

const buildTestEntry = (entry, index) => {
    let testEntry = document.createElement('li');
    testEntry.id = `wbce-test-entry-${index}`;
    testEntry.classList.add('wbce-test-entry');
    // Fill with label
    return testEntry;
};

const buildDisplayPanel = (benchmarks) => {
    let displayPanel = document.createElement('div');
    displayPanel.classList.add('wbce-display-panel');

    // List (.wbce-test-entries) of (.wbce-test-entry) items
    let testEntriesList = document.createElement('ul');
    testEntriesList.classList.add('wbce-test-entries');
    displayPanel.appendChild(testEntriesList);

    let testEntries = benchmarks.getEntries().map(buildTestEntry);
    for (let i = 0; i < testEntries.length; i++) {
        testEntriesList.appendChild(testEntries[i]);
    }
    //
    //

    body.appendChild(displayPanel);
};

const body = document.getElementsByTagName('body')[0];

const observedPerformanceEvents = ['resource'];
const performanceRegistry = observedPerformanceEvents.reduce((registry, entryType) => toObj(entryType, [], registry), {});

const performanceObserver = new PerformanceObserver((list, obj) => {
    let entries = list.getEntries() || [];
    entries.forEach(e => performanceRegistry[e.entryType].push(e));
});

// Observable entry types: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType
performanceObserver.observe({entryTypes: observedPerformanceEvents});

let lastRefresh = 0;
const benchmarks = new Benchmarks();

buildDisplayPanel(benchmarks);


let refreshBenchmarks = (mutationsList, observer) => {
    let isNotExtensionChanged = mutationsList.filter(({target}) => notDisplayPanel(target)).length > 0;
    let timespan = Date.now() - lastRefresh;
    if (isNotExtensionChanged && timespan > 100) {
        lastRefresh = Date.now();

        benchmarks.getBenchmarks().forEach((benchmark, index) => {
            document.getElementById(`wbce-test-entry-${index}`).innerHTML = `${benchmark.getLabel()}:<br>${benchmark.execute({performanceRegistry})}`;
        });
    }
};

// let refreshBenchmarks = (mutationsList, observer) => {
//     let isNotExtensionChanged = mutationsList.filter(({target}) => notDisplayPanel(target)).length > 0;
//     let timespan = Date.now() - lastRefresh;
//     if (isNotExtensionChanged && timespan > 100) {
//         lastRefresh = Date.now();
//         while (displayPanel.firstChild) {
//             displayPanel.removeChild(displayPanel.firstChild);
//         }
//
//         let displayPanelHeading = document.createElement('p');
//         displayPanelHeading.classList.add('wbce-benchmark');
//         displayPanelHeading.innerHTML = 'Benchmarks:';
//         displayPanel.appendChild(displayPanelHeading);
//
//         let evals = Benchmarks.evaluate(performanceRegistry);
//         evals.forEach(p => displayPanel.appendChild(p));
//     }
// };

let bodyModificationObserver = new MutationObserver(refreshBenchmarks);
refreshBenchmarks([{target: body}]); // init is required for static pages
bodyModificationObserver.observe(body, {childList: true, attributes: true, subtree: true, characterData: true});


