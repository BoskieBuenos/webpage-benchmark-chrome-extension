import {isTag, notDisplayPanel, isVisible, attributeContains, distinct} from "../filters.js";
import {css} from "../../utils/dom-utils.js";

const isVisibleInput = (element) => {
    return isVisible(element) && isTag('input', 'textarea', 'select')(element)
};

const groupByRequiredAndLabel = (inputs, input) => {
    let isRequired = input.required || attributeContains('aria-required', 'true')(input);
    let group = isRequired ? inputs.required : inputs.default;
    let labelledInput = {input, label: document.querySelector(`label[for=${input.id}]`)};
    group.push(labelledInput);
    return inputs;
};

class TextDecoration {
    // text-decoration syntax: text-decoration-line text-decoration-color text-decoration-style|initial|inherit;
    constructor(element) {
        this.textDecorationLine = css(element, 'text-decoration-line');
        this.textDecorationColor = css(element, 'text-decoration-color');
        this.textDecorationStyle = css(element, 'text-decoration-style');
    };

    equals({textDecorationLine, textDecorationColor, textDecorationStyle}) {
        return this.textDecorationLine === textDecorationLine &&
            this.textDecorationColor === textDecorationColor &&
            this.textDecorationStyle === textDecorationStyle;
    }
}

class RequiredFieldsNotIndicated {
    getLabel = () => {
        return "39 Required fields not clearly indicated";
    };

    execute = () => {
        let forms = [...document.getElementsByTagName('form')].filter(notDisplayPanel);
        forms = forms.map(form => {
            return {
                form,
                inputs: [...form.elements].filter(isVisibleInput).reduce(groupByRequiredAndLabel, {
                    required: [],
                    default: []
                })
            }
        });
        forms.forEach(this.calculateColors);
        forms.forEach(this.calculateTextDecorations);
        forms.forEach(this.calculateFontFamilies);

        // Check if required inputs' labels consists of * suffix
        forms.forEach(this.checkSuffix);
        // Calculate colors for required and non-required inputs' labels
        forms.forEach(this.checkColors);
        // Calculate text-decorations for required and non-required inputs' labels
        forms.forEach(this.checkTextDecorations);
        // Calculate font-families for required and non-required inputs' labels
        forms.forEach(this.checkFontFamilies);

        let formWithoutDistinctiveRequiredInputs = forms.filter(f => {
            return f.inputs.required.some(i => !i.isDistinguishedByAstrix && !i.isDistinguishedByColor && !i.isDistinguishedByTextDecoration && !i.isDistinguishedByFontFamily)
        });

        return `There are ${formWithoutDistinctiveRequiredInputs.length} forms with problems`;
    };

    calculateColors(form) {
        // add non-required inputs' labels colors list to form object
        form.inputs.required.forEach(i => i.labelColor = css(i.label, 'color'));
        form.inputs.default.forEach(i => i.labelColor = css(i.label, 'color'));
        form.defaultLabelsColors = form.inputs.default.map(i => i.labelColor).filter(distinct);
    }

    calculateTextDecorations(form) {
        // text-decoration syntax: text-decoration-line text-decoration-color text-decoration-style|initial|inherit;
        form.inputs.required.forEach(i => i.labelTextDecoration = new TextDecoration(i.label));
        form.inputs.default.forEach(i => i.labelTextDecoration = new TextDecoration(i.label));
        form.defaultLabelsTextDecorations = form.inputs.default.map(i => i.labelTextDecoration).reduce((acc, textDecoration) => {
            if (!acc.some(td => td.equals(textDecoration))) {
                acc.push(textDecoration);
            }
            return acc;
        }, []);
    }

    calculateFontFamilies(form) {
        form.inputs.required.forEach(i => i.labelFontFamily = css(i.label, 'font-family'));
        form.inputs.default.forEach(i => i.labelFontFamily = css(i.label, 'font-family'));
        form.defaultLabelsFontFamilies = form.inputs.default.map(i => i.labelFontFamily).filter(distinct);
    }

    checkSuffix(form) {
        form.inputs.required.forEach(i => {
            let label = i.label.innerText.trim();
            i.isDistinguishedByAstrix = label[0] === '*' || label[label.length - 1] === '*'
        });
    }

    checkColors(form) {
        form.inputs.required.forEach(i => i.isDistinguishedByColor = form.defaultLabelsColors.indexOf(i.labelColor) === -1);
    }

    checkTextDecorations(form) {
        form.inputs.required.forEach(i => i.isDistinguishedByTextDecoration = !form.defaultLabelsTextDecorations.some(td => td.equals(i.labelTextDecoration)));
    }

    checkFontFamilies(form) {
        form.inputs.required.forEach(i => i.isDistinguishedByFontFamily = form.defaultLabelsFontFamilies.indexOf(i.labelFontFamily) === -1);
    }
}

export default new RequiredFieldsNotIndicated();
