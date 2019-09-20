import {isVisible} from "../../benchmarks/filters.js";
import {getAllHeadings} from "../../utils/dom-utils.js";

export default () => {
    const h1Regex = /h1/i;
    let h1s = getAllHeadings().filter(h => h1Regex.test(h.tagName)).filter(isVisible);
    return h1s.length;
}
