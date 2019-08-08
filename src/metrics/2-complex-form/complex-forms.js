import {isVisible} from "../../benchmarks/filters.js"; // TODO This module shouldn't depend on it

export default () => {
    let forms = [...document.getElementsByTagName('form')].filter(isVisible);
    return forms.map(form => { return { // TODO Consider universal schema, like "{ node: e[0], value: e[1] }"
        node: form,
        elements: form.elements.length
    }});
}
