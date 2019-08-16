import {toPx, css, getButtonsWithContrast} from "../../utils/dom-utils.js";
import {notDisplayPanel} from "../filters.js";

// Arbitrarily chosen 1.5 as a CTA contrast threshold
const CTAContrastThreshold = 1.5;
let minSize = toPx('9mm');

///
// "A minimum recommended touch target size is around 48 device independent pixels on a site with a properly set mobile
// viewport. For example, while an icon may only have a width and height of 24px, you can use additional padding to
// bring the tap target size up to 48px. The 48x48 pixel area corresponds to around 9mm, which is about the size of a
// person's finger pad area."
//  - from https://developers.google.com/web/fundamentals/accessibility/accessible-styles#multi-device_responsive_design
///
class TooSmallCtas {
    getLabel = () => {
        return `11.2 Too small CTAs (min ${parseInt(minSize)}px)`;
    };

    execute = () => {
        let buttons = getButtonsWithContrast().filter(b => notDisplayPanel(b.button));
        let ctas = buttons.filter(c => c.contrast > CTAContrastThreshold).map(c => c.button);
        let tooSmallCTAs = ctas.filter(c => {
            // box-sizing: border-box - width contains paddings
            if (css(c, 'box-sizing') === 'border-box') {
                return parseFloat(css(c, 'width')) <= parseFloat(minSize) || parseFloat(css(c, 'height')) <= parseFloat(minSize);
            }
            // the other way - width not contains paddings
            return (parseFloat(css(c, 'width')) + parseFloat(css(c, 'padding-left')) + parseFloat(css(c, 'padding-right'))) <= parseFloat(minSize) ||
                (parseFloat(css(c, 'height')) + parseFloat(css(c, 'padding-top')) + parseFloat(css(c, 'padding-bottom'))) <= parseFloat(minSize);
        }).map(b => b.innerText);

        return `${tooSmallCTAs.join(", ")}`;
    }
}

export default new TooSmallCtas();
