import {css} from "../../utils/dom-utils.js";
import {isVisible, notDisplayPanel, isTag, distinct} from "../filters.js";

class FixedBarTooBigCoveringContent {
    getLabel = () => {
        return "23 Fixed bar too big covering content";
    };

    execute = () => {
        // Find fixed elements
        let fixedElements = [...document.getElementsByTagName("*")]
            .filter(e => css(e, 'position') === 'fixed')
            .filter(notDisplayPanel)
            .filter(isVisible);

        // Header element or full width element (can be div, nav or whatever)
        let fixedHeaders = fixedElements.filter(isTag('header'));
        let fixedFullWidthElements = fixedElements.filter(e => css(e, 'width') === css(document.body, 'width'));

        let viewportHeight = document.documentElement.clientHeight;

        let coveredHeight = fixedHeaders.concat(...fixedFullWidthElements).filter(distinct).map(f => {
            return {
                element: f,
                coveredHeight: parseFloat(css(f, 'height')) / viewportHeight
            }
        });
        return `heading covers ${coveredHeight.map(c => Math.round(c.coveredHeight * 100)).join('%, ')}%`;
    }
}

export default new FixedBarTooBigCoveringContent();
