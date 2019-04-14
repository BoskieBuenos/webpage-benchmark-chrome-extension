import { isVisible, distinct } from '../filters.js';

class LinkCount {
    getLabel = () => {
        return "Interactive elements";
    };

    execute = () => {
        let links = [...document.getElementsByTagName('a')].filter(isVisible);
        let buttons = [...document.getElementsByTagName('button')].filter(isVisible);
        let iteractiveElements = [...document.getElementsByTagName('*')].filter(e => {
            return e.hasAttribute('onclick') ||
            e.hasAttribute('onmousedown') ||
            e.hasAttribute('onmouseup') ||
            e.hasAttribute('ondblclick')
        }).filter(isVisible);
        let benchmarkValue = links.concat(buttons).concat(iteractiveElements).filter(distinct).length;
        return `${benchmarkValue} (${links.length} links / ${buttons.length} buttons / ${iteractiveElements.length} interactives)`
    };
}

export default new LinkCount();
