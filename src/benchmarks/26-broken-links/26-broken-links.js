import {isVisible, notDisplayPanel} from "../filters.js";
import {checkExistance} from "../../utils/ajax-utils.js";

const resultElementId = 'wbce-result-26';

class BrokenLinks {
    getLabel = () => {
        return "26 Broken links";
    };

    execute = () => {
        let allLinks = [...document.getElementsByTagName('a')]
            .filter(notDisplayPanel)
            .filter(isVisible)
            .filter(link => link.href.length > 0);

        let promises = Promise.all(allLinks.map(link => checkExistance(link.href)));
        promises.then((result) => {
            document.getElementById(resultElementId).innerText = 'All links are OK'
        });
        promises.catch((result) => {
            document.getElementById(resultElementId).innerText = 'Some links are broken'
        });
        return `<span id="${resultElementId}">Verifying links, it may take some time...</span>`;
    }
}

export default new BrokenLinks();
