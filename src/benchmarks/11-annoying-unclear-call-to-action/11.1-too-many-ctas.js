import {getButtonsWithContrast} from "../../utils/dom-utils.js";

// Arbitrarily chosen 1.5 as a CTA contrast threshold
const CTAContrastThreshold = 1.5;

class TooManyCtas {
    getLabel = () => {
        return "11.1 Too many CTAs";
    };

    execute = () => {
        let buttons = getButtonsWithContrast();
        let ctas = buttons.filter(c => c.contrast > CTAContrastThreshold).map(c => c.button);
        let ctasStr = ctas.length > 0 ? ctas.map(c => c.innerText).join(', ') : 'NOT FOUND';
        return `contrast +${CTAContrastThreshold}: ${ctasStr}`;
    }
}

export default new TooManyCtas();
