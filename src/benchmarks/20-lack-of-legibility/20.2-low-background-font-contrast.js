import {isVisible, notDisplayPanel} from "../filters.js";
import {contrast, getBackgroundColor, css, parseColor} from "../../utils/dom-utils.js";

const textContrastThreshold = 4.5; // TODO select sensible value

class LowBackgroundFontContrast {
    getLabel = () => {
        return "20.2 Low contrast between background-font";
    };

    execute = () => {
        // Get all text nodes and calculate its contrast with background
        let textNodes = [], n;
        let treeWalker = document.createTreeWalker(document.body, NodeFilter.TEXT_NODE,
            {
                acceptNode: (node) => {
                    if (!notDisplayPanel(node.parentElement) && !isVisible(node.parentElement)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    let isNotEmptyTextNode = node.nodeType === Node.TEXT_NODE && node.textContent.trim().length;
                    return isNotEmptyTextNode ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            }, false);
        while (n = treeWalker.nextNode()) {
            textNodes.push(n);
        }

        let notContrastingTexts = textNodes.map(element => {
            let textColor = parseColor(css(element.parentElement, 'color'));
            let backgroundColor = getBackgroundColor(element);
            return {element, backgroundColor, contrast: contrast(textColor, backgroundColor)}
        }).filter(e => e.contrast < textContrastThreshold);

        let minTextContrast = Math.min(...notContrastingTexts.map(c => c.contrast));

        return `elements below ${textContrastThreshold} contrast ${notContrastingTexts.length}, min contrast ${minTextContrast}`;
    }
}

export default new LowBackgroundFontContrast();
