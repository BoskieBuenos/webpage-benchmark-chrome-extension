///
/// Bad composition - not visible hierarchy presentation
///

import {isVisible} from "../filters.js";
import {css} from "../../utils/dom-utils.js";

const MIN_DIFFERENCE = 4; //px // TODO specify in %

function sizeDiff(elements, relElements) {
    let diffs = [];
    elements.forEach(element => {
        diffs = diffs.concat(relElements.map(relElement => {
            let diff = parseInt(css(relElement, 'font-size')) - parseInt(css(element, 'font-size')); // TODO calculate in %
            return { diff, element, relElement }
        }));
    });
    return diffs;
}

class BadComposition {
    getLabel = () => {
        return "10.2 Bad composition - not visible hierarchy presentation";
    };

    execute = () => {
        // TODO Detect wrong positioning and paddings of headings
        // Check sizes of same typeface headings and different importance
        let h1 = [...document.getElementsByTagName(`h1`)].filter(isVisible);
        let h2 = [...document.getElementsByTagName(`h2`)].filter(isVisible);
        let h3 = [...document.getElementsByTagName(`h3`)].filter(isVisible);
        let h4 = [...document.getElementsByTagName(`h4`)].filter(isVisible);
        let h5 = [...document.getElementsByTagName(`h5`)].filter(isVisible);
        let h6 = [...document.getElementsByTagName(`h6`)].filter(isVisible);
        let inconsistentHeadings = sizeDiff(h2, h1).filter(d => d.diff <= MIN_DIFFERENCE);
        inconsistentHeadings.concat(sizeDiff(h3, [...h1, ...h2]).filter(d => d.diff <= MIN_DIFFERENCE));
        inconsistentHeadings.concat(sizeDiff(h4, [...h1, ...h2, ...h3]).filter(d => d.diff <= MIN_DIFFERENCE));
        inconsistentHeadings.concat(sizeDiff(h5, [...h1, ...h2, ...h3, ...h4]).filter(d => d.diff <= MIN_DIFFERENCE));
        inconsistentHeadings.concat(sizeDiff(h6, [...h1, ...h2, ...h3, ...h4, ...h5]).filter(d => d.diff <= MIN_DIFFERENCE));
        let isInconsistencyInHeadings = inconsistentHeadings.length > 0;
        return `Inconsistency in headings ${isInconsistencyInHeadings ? 'YES' : 'NO'} (${inconsistentHeadings.map(d => `${d.element.innerText} ${d.relElement.innerText} ${d.diff}`).join(" / ")})`;
    }
}

export default new BadComposition();
