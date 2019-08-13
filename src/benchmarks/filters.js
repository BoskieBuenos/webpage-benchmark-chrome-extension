export function isVisible(node) {
    var visibleAsElement = node.nodeType !== Node.ELEMENT_NODE || window.getComputedStyle(node).display !== 'none';
    return (visibleAsElement && node.offsetParent !== null);
}

export function distinct(element, index, self) {
    return self.indexOf(element) === index;
}

export function notNull(element) {
    return element !== null;
}

export function HTMLNodesOfType(type) {
    return (element) => {
        for (var i = 0; i < element.childNodes.length; ++i)
            if (element.childNodes[i].nodeType === type)
                console.log(element.childNodes[i].textContent);
        return element.nodeType === type;
    }
}

export function attributeContains(attr, value) {
    return (element) => {
        let attribute = element.getAttribute(attr);
        return attribute && attribute.indexOf(value) > -1
    }
}
