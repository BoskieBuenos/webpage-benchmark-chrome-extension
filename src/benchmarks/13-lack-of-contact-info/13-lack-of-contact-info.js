import {isVisible, containsText, containsHeading} from "../filters.js";

class LackOfContactInfo {
    getLabel = () => {
        return "13 Lack of contact info";
    };

    execute = () => {
        // Is there a form with "Contact" heading or "Contact" link or <main_url>/contact responds OK
        let contactForm = [...document.getElementsByTagName('form')].filter(isVisible).filter(containsHeading('contact'));
        let contactLink = [...document.getElementsByTagName('a')].filter(isVisible).filter(containsText('contact'));
        // TODO <main_url>/contact responds OK
        return `Contact forms ${contactForm.length}, contact links ${contactLink.length}`;
    }
}

export default new LackOfContactInfo();
