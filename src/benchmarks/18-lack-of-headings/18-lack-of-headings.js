import {isVisible} from "../filters.js";

class LackOfHeadings {
    getLabel = () => {
        return "18 Lack of headings";
    };

    execute = () => {
        // Check if h1 is present (there should be exactly one)
        let headings = [[...document.getElementsByTagName('h1')].filter(isVisible)];
        let quantityOfH1s = headings[0].length;
        // Check if page contains proper hierarchy of headings (if h4 is present then h3, h2, and h1 should be present too)
        headings.push([...document.getElementsByTagName('h2')].filter(isVisible));
        headings.push([...document.getElementsByTagName('h3')].filter(isVisible));
        headings.push([...document.getElementsByTagName('h4')].filter(isVisible));
        headings.push([...document.getElementsByTagName('h5')].filter(isVisible));
        headings.push([...document.getElementsByTagName('h6')].filter(isVisible));
        let isHeadingsHierarchyOk = !headings.some((h, index) => headings.slice(index + 1).some(hw => hw.length > 0));
        return `H1s ${quantityOfH1s}, ${isHeadingsHierarchyOk ? 'Headings hierarchy is OK' : 'Headings hierarchy is WRONG' }`;
    }
}

export default new LackOfHeadings();
