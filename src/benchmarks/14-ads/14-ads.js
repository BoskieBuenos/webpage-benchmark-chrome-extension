// https://medium.com/@KentGruber/build-your-own-ad-blocker-90230436e364

import {notDisplayPanel, attributeContains} from "../filters.js";

class AdsInAllTheWrongPlaces {
    getLabel = () => {
        return "14 Ads in All the Wrong Places";
    };

    execute = () => {
        // Naively find <iframe> elements with with src containing phrase 'doubleclick.net'
        let ads = [...document.getElementsByTagName('iframe')].filter(attributeContains('src', 'doubleclick.net')).filter(notDisplayPanel);
        return `ads ${ads.length}`;
    }
}

export default new AdsInAllTheWrongPlaces();
