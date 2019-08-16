import {css} from "../../utils/dom-utils.js";

const fontSizeThreshold = 100; // TODO select sensible value

class SmallFont {
    getLabel = () => {
        return "20.1 Small font";
    };

    execute = () => {
        // Get all elements with fonts below the threshold
        let tooSmallElements = [...document.getElementsByTagName('*')].map(e => {
            return {
                element: e,
                fontSize: parseFloat(css(e, 'font-size'))
            }
        }).filter(e => e.fontSize < fontSizeThreshold);

        let minFontSize = Math.min(...tooSmallElements.map(e => e.fontSize));

        return `elements below ${fontSizeThreshold}px ${tooSmallElements.length}, min font size ${minFontSize}px`;
    }
}

export default new SmallFont();
