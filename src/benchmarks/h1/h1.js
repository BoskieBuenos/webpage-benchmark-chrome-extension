import { isVisible } from '../filters.js';

class H1 {
    getLabel = () => {
        return "Main heading H1";
    };

    execute = () => {
        let elements = [...document.getElementsByTagName('h1')].filter(isVisible).length;
        if (elements === 0) return 'None';
        if (elements > 1) return `Multiple (${elements})`;
        return 'OK (1)';
    }
}

export default new H1();
