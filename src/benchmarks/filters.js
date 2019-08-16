import {getAllHeadings} from "../utils/dom-utils.js";

export function notDisplayPanel(node) {
    // We assume here that every element of the extension has class prefixed with 'wbce'
    return !/\bwbce-/.test(node.className);
}

export function isVisible(node) {
    let visibleAsElement = node.nodeType !== Node.ELEMENT_NODE || window.getComputedStyle(node).display !== 'none';
    return (visibleAsElement && node.offsetParent !== null);
}

export function distinct(element, index, self) {
    return self.indexOf(element) === index;
}

export function notNull(element) {
    return element !== null;
}

export function HTMLNodesOfType(type) {
    return (element) => {
        // TODO The loop isn't doing anything
        // for (let i = 0; i < element.childNodes.length; ++i)
        //     if (element.childNodes[i].nodeType === type)
        //         console.log(element.childNodes[i].textContent);
        return element.nodeType === type;
    }
}

export function attributeContains(attr, value) {
    return (element) => {
        let attribute = element.getAttribute(attr);
        return attribute && isSubstring(value, attribute);
    }
}

export function containsText(fragment) {
    return (element) => isSubstring(fragment, element.innerText);
}

export function containsHeading(fragment) {
    return (rootElement) => getAllHeadings(rootElement).some(containsText(fragment));
}

function isSubstring(substring, ofString) {
    let searchedPattern = new RegExp(substring, 'i');
    return searchedPattern.test(ofString);
}