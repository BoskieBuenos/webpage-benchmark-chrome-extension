import {isVisible} from "../benchmarks/filters.js";

export function getFirstParentElement(node = {parentElement: null}) {
    if (node.parentElement === null || node.parentElement.nodeType === Node.ELEMENT_NODE) {
        return node.parentElement;
    } else {
        return getFirstParentElement(node.parentElement);
    }
}

export function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

export function getAllHeadings(rootElement = document, onlyVisible = true) {
    let headings = [1, 2, 3, 4, 5, 6].reduce((acc, i) => acc.concat([...rootElement.getElementsByTagName(`h${i}`)]), []);
    return onlyVisible ? headings.filter(isVisible) : headings;
}

export function getAllTextNodes() {
    let textNodes = [], n;
    let treeWalker = document.createTreeWalker(document.body, NodeFilter.TEXT_NODE,
        {
            acceptNode: (node) => {
                if (!isVisible(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                let isNotEmptyTextNode = node.nodeType === Node.TEXT_NODE && node.textContent.trim().length;
                return isNotEmptyTextNode ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
        }, false);
    while (n = treeWalker.nextNode()) {
        textNodes.push(n);
    }
    return textNodes
}

export function getButtonsWithContrast() {
    let buttons = [...document.getElementsByTagName('button')].filter(isVisible);
    return buttons.map(button => {
        let backgroundColor = getBackgroundColor(button.parentElement);
        let buttonColor = parseColor(css(button, 'background-color'));
        let withBackgroundContrast = contrast(buttonColor, backgroundColor);
        return {button, backgroundColor, contrast: withBackgroundContrast}
    });
}

// Source: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
export function luminanace(r, g, b) {
    let a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRgba(rgba1, rgba2) {
    return rgba1[3] !== 0 || rgba2[3] !== 0 ? contrastRgb(rgba1, rgba2) : 1; // TODO handle semi-transparent background
}

// Source: https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/color.js
function contrastRgb(rgb1, rgb2) {
    let l1 = luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05;
    let l2 = luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05;
    return Math.max(l1, l2) / Math.min(l1, l2);
}

export function contrast(color1, color2) {
    color1[3] |= 1; // TODO fails for rgba(0,0,0,0) - should be ?=
    color2[3] |= 1;
    return contrastRgba(color1, color2);
}

export function getBackgroundColor(element) {
    if (element && element.nodeType !== Node.ELEMENT_NODE) {
        element = getFirstParentElement(element);
    }
    if (element === null) {
        return null;
    }
    let elementColor = parseColor(css(element, 'background-color'));
    let accColor = [
        elementColor[0] * elementColor[3],
        elementColor[1] * elementColor[3],
        elementColor[2] * elementColor[3]
    ];
    let opacity = 1 - elementColor[3];
    element = getFirstParentElement(element);

    while (opacity > 0) {
        if (element === null) { // even <html> is transparent
            element = undefined;
            elementColor = [255, 255, 255, 1]; // default browser background
        } else {
            elementColor = parseColor(css(element, 'background-color'));
        }
        accColor[0] += elementColor[0] * opacity;
        accColor[1] += elementColor[1] * opacity;
        accColor[2] += elementColor[2] * opacity;
        opacity *= 1 - elementColor[3];
        element = getFirstParentElement(element);
    }
    return accColor;
}

/// return array of [r,g,b,a] from any valid color. if failed returns undefined
/// Source: https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
export function parseColor(color) {
    if (!color) {
        return;
    }
    if (color.toLowerCase() === 'transparent') {
        return [0, 0, 0, 0];
    }
    if (color[0] === '#') {
        if (color.length < 7) {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1];
    }
    if (color.indexOf('rgb') === -1) {
        // convert named colors
        let tempElem = document.createElement('fictum');
        tempElem.style.display = 'none';
        document.body.appendChild(tempElem); // intentionally use unknown tag to lower chances of css rule override with !important
        let flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        tempElem.style.color = flag;
        if (tempElem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        tempElem.style.color = color;
        if (tempElem.style.color === flag || tempElem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(tempElem).color;
        document.body.removeChild(tempElem);
    }
    if (color.indexOf('rgb') === 0) { // TODO Not working for rgba(0,0,0,0)
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a) {
            return +a
        });
    }
}

export function toPx(measure) {
    let tempElem = document.createElement('fictum');
    tempElem.style.display = 'none';
    document.body.appendChild(tempElem); // intentionally use unknown tag to lower chances of css rule override with !important
    tempElem.style.width = measure;
    let ppi = css(tempElem, 'width');
    document.body.removeChild(tempElem);
    return ppi;
}

// Source: https://lowrey.me/implementing-javas-string-hashcode-in-javascript/
export function hashString(str){
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}