///
/// Input document
///
import {isVisible} from "../../benchmarks/filters.js"; // TODO This module shouldn't depend on it

export default () => {
    // Find navigation containers
    let navTagContainers = [...document.getElementsByTagName('nav')].filter(isVisible);
    let navigationRoleContainers = [...document.getElementsByTagName('*')].filter(t => t.getAttribute('role') === 'navigation').filter(isVisible);
    let navigationContainers = navTagContainers.concat(navigationRoleContainers);
    // Find lists and calculate depth
    let allLists = [...document.getElementsByTagName('ul')].concat([...document.getElementsByTagName('ol')]).concat([...document.getElementsByTagName('dl')]);
    let navigationElements = allLists.filter(list => navigationContainers.some(nav => nav.contains(list)));

    // calculate all nav elems depths
    let depths = navigationElements.map(navElem => {
        let navContainer = navigationContainers.find(navCont => navCont.contains(navElem));
        let depth = navigationElements.filter(t2 => t2.contains(navElem)).length;
        return { depth, navContainer }
    });
    // make dictionary of all navs
    // missing navs have depth = zero
    let maxDepths = new Map();
    navigationContainers.forEach(navCont => maxDepths.set(navCont, 0));
    // iterate over nav elems depths & match max depth to navs
    maxDepths = depths.reduce((acc, contDepth) => {
        acc.set(contDepth.navContainer, Math.max(acc.get(contDepth.navContainer), contDepth.depth));
        return acc;
    }, maxDepths);

    return Array.from(maxDepths, e => {
        return { navContainer: e[0], depth: e[1] } // TODO Consider universal schema, like "{ node: e[0], value: e[1] }"
    });
}
