// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role

import {attributeContains, notDisplayPanel, isVisible} from "../filters.js";

class NoSearchBar {
    getLabel = () => {
        return "29 No search bar";
    };

    execute = () => {
        // find form with role search
        let searchForm = [...document.getElementsByTagName('form')]
            .filter(attributeContains('role', 'search'))
            .filter(notDisplayPanel)
            .filter(isVisible);

        return `search forms ${searchForm.length}`;
    }
}

export default new NoSearchBar();
