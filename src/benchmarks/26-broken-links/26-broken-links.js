import {isVisible, notDisplayPanel} from "../filters.js";

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
        let promises = Promise.all(allLinks.map(link => {
            const url = link.href;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = () => {
                    if (xhr.status !== 404) {
                        resolve(xhr.responseText)
                    } else {
                        reject(xhr.statusText);
                    }
                };
                xhr.onerror = () => {
                    reject(xhr.statusText);
                };
                xhr.send();
            })
        }));
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
