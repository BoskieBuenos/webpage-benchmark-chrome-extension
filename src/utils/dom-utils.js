import {isVisible} from "../benchmarks/filters.js";

export function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

export function getAllHeadings(rootElement = document, onlyVisible = true) {
    let headings = [1, 2, 3, 4, 5, 6].reduce((acc, i) => acc.concat([...rootElement.getElementsByTagName(`h${i}`)]), []);
    return onlyVisible ? headings.filter(isVisible) : headings;
}

export function getButtonsWithContrast() {
    let buttons = [...document.getElementsByTagName('button')].filter(isVisible);
    return buttons.map(button => {
        let backgroundColor = getBackgroundColor(button);
        let buttonColor = parseColor(css(button, 'background-color'));
        let withBackgroundContrast = buttonColor[3] !== 0 ? contrast(buttonColor, backgroundColor) : 1; // TODO handle semi-transparent background
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

// Source: https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/color.js
export function contrast(rgb1, rgb2) {
    let l1 = luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05;
    let l2 = luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05;
    return Math.max(l1, l2) / Math.min(l1, l2);
}

export function getBackgroundColor(element) {
    let parent = element.parentElement;
    let parentCssColor = css(parent, 'background-color');
    let parentColor = parseColor(parentCssColor);
    let parentOpacity = parentColor[3];
    let opacity = 1 - parentOpacity;

    let accColor = [parentColor[0], parentColor[1], parentColor[2]];
    parent = parent.parentElement;

    while (parent) {
        parentCssColor = css(parent, 'background-color');
        parentColor = parseColor(parentCssColor);
        accColor[0] = accColor[0] * (1 - opacity) + parentColor[0] * opacity;
        accColor[1] = accColor[1] * (1 - opacity) + parentColor[1] * opacity;
        accColor[2] = accColor[2] * (1 - opacity) + parentColor[2] * opacity;
        parentOpacity = parentColor[3];
        opacity = opacity * (1 - parentOpacity);

        if (parentOpacity === 1) {
            return accColor;
        }
        parent = parent.parentElement;
    }
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
    if (color.indexOf('rgb') === 0) {
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
