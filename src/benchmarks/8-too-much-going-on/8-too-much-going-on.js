import {getAllHeadings} from "../../utils/dom-utils.js";
import {notDisplayPanel} from "../filters.js";

class TooMuchGoingOn {
    getLabel = () => {
        return "8. Too much going on";
    };

    execute = () => {
        // Count headings
        let headings = getAllHeadings().filter(notDisplayPanel);
        // TODO Amount of content?
        // TODO Clutternes?
        // TODO Small margins between components?
        return `Headings ${headings.length}, PARTIALLY IMPLEMENTED`;
    }
}

export default new TooMuchGoingOn();
