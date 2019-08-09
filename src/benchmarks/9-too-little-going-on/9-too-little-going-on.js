import {isVisible, attributeContains} from '../filters.js';

class TooLittleGoingOn {
    getLabel = () => {
        return '9. Too little going on';
    };

    execute = () => {
        // Does the site have an icon
        // 1. Check <link rel='icon'>
        let icon = [...document.getElementsByTagName('link')].filter(t => t.getAttribute('rel') === 'icon');
        // TODO 2. Make GET on '/favicon.ico'
        // if (icon.length === 0) {
        //     icon = fetch('/favicon.ico');
        // }
        let hasIcon = !!icon;
        // Does the site have a logo
        // TODO Better rules for github.com
        let logoClass = [...document.querySelectorAll(`[class*='logo']`)].filter(isVisible);
        let logoImg = [...document.getElementsByTagName('img')].filter(attributeContains('src', 'logo')).filter(isVisible);
        let logoA = [...document.getElementsByTagName('a')].filter(attributeContains('href', 'logo')).filter(isVisible);
        let hasLogo = logoClass.length > 0 || logoImg.length > 0 || logoA.length > 0;
        // Does the site have the title
        let title = document.getElementsByTagName('title');
        let hasTitle = !!title && title.length > 0;
        return `Title ${hasTitle ? 'TAK' : 'BRAK'} / Logo ${hasLogo ? 'TAK' : 'BRAK'} / Icon ${hasIcon ? 'TAK' : 'BRAK'}`;
    }
}

export default new TooLittleGoingOn();
