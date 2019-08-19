import {notDisplayPanel, isVisible, attributeContains} from '../filters.js';
import {checkExistance} from "../../utils/ajax-utils.js";

const iconResultElementId = 'wbce-result-9-icon';

class TooLittleGoingOn {
    getLabel = () => {
        return '9. Too little going on';
    };

    execute = () => {
        // Does the site have an icon
        // 1. Check <link rel='icon'>
        let icon = [...document.getElementsByTagName('link')].filter(t => t.getAttribute('rel') === 'icon').filter(notDisplayPanel);
        // 2. Make GET on '/favicon.ico'
        if (icon.length === 0) {
            let promise = checkExistance(`${window.location.origin}/favicon.ico`);
            promise.then((r) => document.getElementById(iconResultElementId).innerText = 'YES (favicon.ico)');
        }

        let hasIcon = icon.length > 0;
        // Does the site have a logo
        // TODO Better rules for github.com
        let logoClass = [...document.querySelectorAll(`[class*='logo']`)].filter(notDisplayPanel).filter(isVisible);
        let logoImg = [...document.getElementsByTagName('img')].filter(attributeContains('src', 'logo')).filter(notDisplayPanel).filter(isVisible);
        let logoA = [...document.getElementsByTagName('a')].filter(attributeContains('href', 'logo')).filter(notDisplayPanel).filter(isVisible);
        let hasLogo = logoClass.length > 0 || logoImg.length > 0 || logoA.length > 0;
        // Does the site have the title
        let title = document.getElementsByTagName('title');
        let hasTitle = !!title && title.length > 0;
        return `Title ${hasTitle ? 'YES' : 'MISSING'} / Logo ${hasLogo ? 'YES' : 'MISSING'} / Icon <span id="${iconResultElementId}">${hasIcon ? 'YES' : 'MISSING'}</span>`;
    }
}

export default new TooLittleGoingOn();
