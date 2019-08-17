import {notDisplayPanel} from "../filters.js";
import {contrast, getBackgroundColor, css, parseColor, getAllTextNodes} from "../../utils/dom-utils.js";

const textContrastThreshold = 4.5; // TODO select sensible value

class LowBackgroundFontContrast {
    getLabel = () => {
        return "20.2 Low contrast between background-font";
    };

    execute = () => {
        // Get all text nodes and calculate its contrast with background
        let textNodes = getAllTextNodes().filter(n => notDisplayPanel(n.parentElement));

        let notContrastingTexts = textNodes.map(element => { // FIXME element is not an Element
            let textColor = parseColor(css(element.parentElement, 'color'));
            let backgroundColor = getBackgroundColor(element);
            return {element, backgroundColor, contrast: contrast(textColor, backgroundColor)}
        }).filter(e => e.contrast < textContrastThreshold);

        let minTextContrast = Math.min(...notContrastingTexts.map(c => c.contrast));

        return `elements below ${textContrastThreshold} contrast ${notContrastingTexts.length}, min contrast ${minTextContrast}`;
    }
}

export default new LowBackgroundFontContrast();
