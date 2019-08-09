import {isVisible} from "../filters.js";

class TooMuchGoingOn {
    getLabel = () => {
        return "8. Too much going on";
    };

    execute = () => {
        // Count headings
        let headings = [1,2,3,4,5,6].reduce((acc, i) => acc.concat([...document.getElementsByTagName(`h${i}`)]), []).filter(isVisible);
        // TODO Amount of content?
        // TODO Clutternes?
        // TODO Small margins between components?
        return `Headings ${headings.length}, PARTIALLY IMPLEMENTED`;
    }
}

export default new TooMuchGoingOn();
