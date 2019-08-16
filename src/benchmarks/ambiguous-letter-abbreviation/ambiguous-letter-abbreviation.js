import { isVisible, distinct, notNull, HTMLNodesOfType } from '../filters.js';

class AmbiguousLetterAbbreviation {
    getLabel = () => {
        return "Ambiguous letter abbreviation";
    };

    execute = () => {
        let acronyms = [];
        let bodyChildren = [...document.body.childNodes].filter((e) => e.nodeType !== Node.ELEMENT_NODE || (e.className.match && !e.className.match(/\bwbce\b/)))
        .filter(isVisible)
        .forEach((node) => {
            this.checkChildrenTextNodes(node, acronyms);
        });
        return acronyms.filter(distinct).join(', ');
    };

    getAbbreviations = (text = '') => {
        return text.match(/\b(?:[a-z]*[A-Z][a-z]*){2,}/g) || [];
    };

    checkChildrenTextNodes = (node, hits) => {
        [...node.childNodes].filter(isVisible).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                Array.prototype.push.apply(hits, this.getAbbreviations(child.textContent))
            } else {
                this.checkChildrenTextNodes(child, hits);
            }
        });
    }
}

export default new AmbiguousLetterAbbreviation();
