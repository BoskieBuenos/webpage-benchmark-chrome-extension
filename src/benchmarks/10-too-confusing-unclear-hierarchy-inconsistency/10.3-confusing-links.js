///
/// Similar links leading to different places
///

import {isVisible, distinct} from "../filters.js";

class ConfusingLinks {
    getLabel = () => {
        return "10.3 Similar links leading to different places";
    };

    execute = () => {
        // Group links by similarity & verify their destinations
        // TODO make fuzzy string comparison - for now exacts
        let links = [...document.getElementsByTagName('a')].filter(isVisible);
        let similarLabels = links.reduce((acc, link) => {
            acc[link.innerText] = (acc[link.innerText] || []).concat(link);
            return acc;
        }, {});
        let repeatingLabels = Object.keys(similarLabels).filter(k => similarLabels[k].length > 1).map(k => similarLabels[k]);
        let repeatingLabelsLeadingToSimilarPlaces = repeatingLabels.map(l => l.filter(distinct)).filter(l => l.length > 1);
        let isSimilarLinkLeadingToDifferentPlaces = repeatingLabelsLeadingToSimilarPlaces.length > 0;
        return `${isSimilarLinkLeadingToDifferentPlaces ? 'YES' : 'NO'}`;
    }
}

export default new ConfusingLinks();
