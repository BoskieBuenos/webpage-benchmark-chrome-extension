import {isVisible} from "../filters.js";
import getFormsComplexities from "../../metrics/2-complex-form/complex-forms.js";

class ComplexRegularForm {
    getLabel = () => {
        return "2.1. Complex form (regular)";
    };

    // TODO exclude sign on forms
    execute = () => {
        let formsStats = getFormsComplexities();
        let maxInputsNumber = Math.max(...formsStats.map(s => s.elements));
        return `Max inputs ${maxInputsNumber}`
    }
}

export default new ComplexRegularForm();
