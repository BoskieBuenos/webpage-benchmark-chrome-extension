///
/// Confusing links labels - Click here, Ok, Cancel, etc.
///

import {notDisplayPanel, isVisible} from "../filters.js";

const MEANINGLESS_ACTION_LABELS = ['click here', 'ok', 'cancel']; // TODO Find better examples

class UnclearActionLabels {
    getLabel = () => {
        return "10.4 Confusing links labels";
    };

    execute = () => {
        let links = [...document.getElementsByTagName('a')].filter(notDisplayPanel).filter(isVisible);
        let buttons = [...document.getElementsByTagName('button')].filter(notDisplayPanel).filter(isVisible);
        let meaninglessActions = links.concat(buttons).filter(e => MEANINGLESS_ACTION_LABELS.indexOf(e.innerHTML.toLowerCase()) > -1);
        return `${meaninglessActions.length > 0 ? meaninglessActions.map(e => e.innerHTML).join(", ") : 'NOT FOUND'}`;
    }
}

export default new UnclearActionLabels();
