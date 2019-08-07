import {isVisible} from "../filters.js";

class ComplexRegularForm {
    getLabel = () => {
        return "2.1. Complex form (regular)";
    };

    // TODO exclude sign on forms
    execute = () => {
        let forms = [...document.getElementsByTagName('form')].filter(isVisible);
        let formsStats = forms.map(form => { return {
            node: form,
            elements: form.elements.length
        }});
        let maxInputsNumber = Math.max(...formsStats.map(s => s.elements));
        return `Max inputs ${maxInputsNumber}`
    }
}

export default new ComplexRegularForm();
