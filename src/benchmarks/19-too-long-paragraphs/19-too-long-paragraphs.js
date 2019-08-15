import {isVisible} from "../filters.js";

class TooLongParagraphs {
    getLabel = () => {
        return "19 Too long paragraphs";
    };

    execute = () => {
        let paragraphs = [...document.getElementsByTagName('p')].filter(isVisible).map(p => { return {
            element: p,
            words: p.innerText.split(' ').length
        }});

        return `lengths ${paragraphs.map(p => p.words).join()}`;
    }
}

export default new TooLongParagraphs();
