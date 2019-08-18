import {attributeContains, notDisplayPanel, isVisible} from "../filters.js";

class NewWindowLinks {
    getLabel = () => {
        return "32 Links that open a new window";
    };

    execute = () => {
        let newWindowLinks = [...document.getElementsByTagName('a')]
            .filter(attributeContains('target', '_blank'))
            .filter(notDisplayPanel)
            .filter(isVisible);

        return `${newWindowLinks.length}`;
    }
}

export default new NewWindowLinks();
