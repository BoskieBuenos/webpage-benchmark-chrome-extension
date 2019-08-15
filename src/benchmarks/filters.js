import {getAllHeadings} from "../utils/dom-utils.js";

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
        for (let i = 0; i < element.childNodes.length; ++i)
            if (element.childNodes[i].nodeType === type)
                console.log(element.childNodes[i].textContent);
        return element.nodeType === type;
    }
}

export function attributeContains(attr, value) {
    return (element) => {
        let attribute = element.getAttribute(attr);
        return attribute && attribute.indexOf(value) > -1
    }
}

export function containsText(fragment) {
    return (element) => {
        let searchedPattern = new RegExp(fragment, 'i');
        return searchedPattern.test(element.innerText);
    }
}

export function containsHeading(fragment) {
    return (rootElement) => getAllHeadings(rootElement).some(containsText(fragment));
}
