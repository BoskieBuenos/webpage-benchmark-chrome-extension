import {notDisplayPanel} from "../filters.js";
import countH1s from "../../metrics/headings/quantity-of-h1s.js";
import getUnHierarchizedHeadings from "../../metrics/headings/un-hierarchized-headings.js";

class LackOfHeadings {
    getLabel = () => {
        return "18 Lack of headings";
    };

    execute = () => {
        // Check if h1 is present (there should be exactly one)
        let quantityOfH1s = countH1s();
        // Check if page contains proper hierarchy of headings (if h4 is present then h3, h2, and h1 should be present too)
        let unhierarchizedHeadings = getUnHierarchizedHeadings().map(h => h.filter(notDisplayPanel));
        let isHeadingsHierarchyOk = unhierarchizedHeadings.length > 0;
        return `H1s ${quantityOfH1s}, ${isHeadingsHierarchyOk ? 'Headings hierarchy is OK' : 'Headings hierarchy is WRONG' }`;
    }
}

export default new LackOfHeadings();
