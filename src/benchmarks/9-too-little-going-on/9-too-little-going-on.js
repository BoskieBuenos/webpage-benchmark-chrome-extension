import {notDisplayPanel, isVisible, attributeContains} from '../filters.js';

class TooLittleGoingOn {
    getLabel = () => {
        return '9. Too little going on';
    };

    execute = () => {
        // Does the site have an icon
        // 1. Check <link rel='icon'>
        let icon = [...document.getElementsByTagName('link')].filter(t => t.getAttribute('rel') === 'icon').filter(notDisplayPanel);
        // TODO 2. Make GET on '/favicon.ico'
        // if (icon.length === 0) {
        //     icon = fetch('/favicon.ico');
        // }
        let hasIcon = !!icon;
        // Does the site have a logo
        // TODO Better rules for github.com
        let logoClass = [...document.querySelectorAll(`[class*='logo']`)].filter(notDisplayPanel).filter(isVisible);
        let logoImg = [...document.getElementsByTagName('img')].filter(attributeContains('src', 'logo')).filter(notDisplayPanel).filter(isVisible);
        let logoA = [...document.getElementsByTagName('a')].filter(attributeContains('href', 'logo')).filter(notDisplayPanel).filter(isVisible);
        let hasLogo = logoClass.length > 0 || logoImg.length > 0 || logoA.length > 0;
        // Does the site have the title
        let title = document.getElementsByTagName('title');
        let hasTitle = !!title && title.length > 0;
        return `Title ${hasTitle ? 'YES' : 'MISSING'} / Logo ${hasLogo ? 'YES' : 'MISSING'} / Icon ${hasIcon ? 'YES' : 'MISSING'}`;
    }
}

export default new TooLittleGoingOn();
