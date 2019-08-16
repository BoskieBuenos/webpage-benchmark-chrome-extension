import {css} from "../../utils/dom-utils.js";
import {isVisible, notDisplayPanel} from "../filters.js";

class UglyImages {
    getLabel = () => {
        return "12 Ugly or irrelevant images";
    };

    execute = () => {
        // get all images and background-images
        // compare their naturalHeight/Width with computed property - warn if streched too much
        let imgs = [...document.getElementsByTagName('img')].filter(notDisplayPanel).filter(isVisible);
        // TODO background-image-s
        let backgroundImgs = [...document.getElementsByTagName('*')].filter(e => css(e, 'background-image'));
        let streches = imgs.map(i => Math.max(parseInt(css(i, 'width'))/i.naturalWidth, parseInt(css(i, 'height'))/i.naturalHeight)).map(s => parseInt(s*100));
        return `${streches.join("%, ")}%`;
    }
}

export default new UglyImages();
