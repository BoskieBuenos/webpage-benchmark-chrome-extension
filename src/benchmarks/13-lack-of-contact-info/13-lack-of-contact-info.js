import {notDisplayPanel, isVisible, containsText, containsHeading} from "../filters.js";
import {checkExistance} from "../../utils/ajax-utils.js";

const contactPageResultElementId = 'wbce-result-13';

class LackOfContactInfo {
    getLabel = () => {
        return "13 Lack of contact info";
    };

    execute = () => {
        // Is there a form with "Contact" heading or "Contact" link or <main_url>/contact responds OK
        // TODO it doesn't have to be form - it can contain just info
        let contactForm = [...document.getElementsByTagName('form')].filter(notDisplayPanel).filter(isVisible).filter(containsHeading('contact'));
        let contactLink = [...document.getElementsByTagName('a')].filter(notDisplayPanel).filter(isVisible).filter(containsText('contact'));
        let promise = checkExistance(`${window.location.origin}/contact`);
        promise.then((r) => document.getElementById(contactPageResultElementId).innerText = 'YES');
        return `Contact forms ${contactForm.length}, contact links ${contactLink.length}, contact page <span id="${contactPageResultElementId}">Missing</span>`;
    }
}

export default new LackOfContactInfo();
