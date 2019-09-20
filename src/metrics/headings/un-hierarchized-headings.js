import {isVisible} from "../../benchmarks/filters.js";

export default () => {
    let headings = [[...document.getElementsByTagName('h1')].filter(isVisible)];
    headings.push([...document.getElementsByTagName('h2')].filter(isVisible));
    headings.push([...document.getElementsByTagName('h3')].filter(isVisible));
    headings.push([...document.getElementsByTagName('h4')].filter(isVisible));
    headings.push([...document.getElementsByTagName('h5')].filter(isVisible));
    headings.push([...document.getElementsByTagName('h6')].filter(isVisible));

    // return nodes with missing higher priority headings
    return headings.filter((h, index) =>
        index !== 0 &&
        h.length !== 0 &&
        headings.slice(0, index).some(hw => hw.length === 0)
    );
}
