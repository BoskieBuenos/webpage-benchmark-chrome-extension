import {isVisible} from "../filters.js";

class MultiLevelNavigation {
    getLabel = () => {
        return "1. Multi Level Navigation";
    };

    execute = () => {
        let maxDepth = -1;
        // Find navigation containers
        let navTagContainers = [...document.getElementsByTagName('nav')].filter(isVisible);
        let navigationRoleContainers = [...document.getElementsByTagName('*')].filter(t => t.getAttribute('role') === 'navigation').filter(isVisible);
        let navigationContainers = navTagContainers.concat(navigationRoleContainers);
        // Find lists and calculate depth
        let allLists = [...document.getElementsByTagName('ul')].concat([...document.getElementsByTagName('ol')]).concat([...document.getElementsByTagName('dl')]);
        let navigationElements = allLists.filter(list => navigationContainers.some(nav => nav.contains(list)));
        navigationElements.forEach(navElem => {
            let depth = navigationElements.filter(t2 => t2.contains(navElem)).length;
            maxDepth = Math.max(maxDepth, depth);
        });

        return `Max depth is ${maxDepth}`;
    };
}

export default new MultiLevelNavigation();
