import { isVisible } from '../filters.js';

class LinkCount {
    getLabel = () => {
        return "Link count";
    };

    execute = () => {
        return [...document.getElementsByTagName("A")].filter(isVisible).length;
    };
}

export default new LinkCount();
