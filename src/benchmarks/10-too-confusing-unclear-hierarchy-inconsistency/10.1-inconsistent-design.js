///
/// Too many typefaces, color schemes, inconsistent design
///

import {isVisible, distinct} from "../filters.js";
import {css} from "../../utils/dom-utils.js";

class InconsistentDesign {
    getLabel = () => {
        return "10.1 Too many typefaces, color schemes, inconsistent design";
    };

    execute = () => {
        // TODO Detect actually rendered font. For now let's assume counting font families is sufficient.
        let fontFamilies = [...document.getElementsByTagName('*')].filter(isVisible).map(element => css(element, 'font-family'));
        let distinctFontFamilies = fontFamilies.filter(distinct);
        // TODO Detect color schemes
        // TODO Detect inconsistent design
        return `Typefaces ${distinctFontFamilies.length} (${distinctFontFamilies.join(" / ")}), PARTIALLY IMPLEMENTED`;
    }
}

export default new InconsistentDesign();
