import {css} from "../../utils/dom-utils.js";
import {isVisible, notDisplayPanel} from "../filters.js";

const fontSizeThreshold = 14;

class SmallFont {
    getLabel = () => {
        return "20.1 Small font";
    };

    execute = () => {
        // Get all elements with fonts below the threshold
        let tooSmallElements = [...document.getElementsByTagName('*')].filter(notDisplayPanel).filter(isVisible).map(e => {
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
