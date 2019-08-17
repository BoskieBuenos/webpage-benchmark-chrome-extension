import {css, getAllTextNodes, getFirstParentElement} from "../../utils/dom-utils.js";
import {notDisplayPanel} from "../filters.js";

// Following returns approximated value. It is closest to real line count for 'word-break' set for 'break-all'.
// It can be treated as minimum number of lines that will be occupied.
function getMinOccupiedLinesOfTextNode(textNode) {
    let containingElement = getFirstParentElement(textNode);
    let virtualContainingElement = containingElement.cloneNode(true);
    virtualContainingElement.style['white-space'] = 'nowrap';
    virtualContainingElement.style.position = 'absolute'; // to not be bounded by parent element
    virtualContainingElement.style.width = 'auto'; // stretch according to the content
    // virtualContainingElement.style.display = 'none';
    virtualContainingElement.style.visibility = 'hidden';
    // FIXME weak hook
    containingElement.parentElement.appendChild(virtualContainingElement);
    let containingElementWidth = parseFloat(css(containingElement, 'width'));
    let fullWidth = parseFloat(css(virtualContainingElement, 'width'));
    containingElement.parentElement.removeChild(virtualContainingElement);
    return parseInt(fullWidth / containingElementWidth);
}

const unbreakableWrapingStyles = ['nowrap', 'pre'];

class TooMuchCenteredText {
    getLabel = () => {
        return "21 Too much centered text";
    };

    execute = () => {
        // Get all centered text and count words and lines

        let textNodes = getAllTextNodes().map(node => {
            return {node, parentElement: getFirstParentElement(node)}
        }).filter(n => notDisplayPanel(n.parentElement));
        let centeredTextNodes = textNodes.filter(n => css(n.parentElement, 'text-align') === 'center');
        let centeredBreakableTextNodes = centeredTextNodes.filter(n =>
            unbreakableWrapingStyles.indexOf(css(n.parentElement, 'white-space')) === -1);
        let centeredTextNodesWithLines = centeredBreakableTextNodes.map(n => {
            return {node: n.node, minLines: getMinOccupiedLinesOfTextNode(n.node)}
        });
        return `(min) lines of centered text ${centeredTextNodesWithLines.map(n => n.minLines).join()}`;
    }
}

export default new TooMuchCenteredText();
