export function isVisible(node) {
    var style = window.getComputedStyle(node);
    return (style.display !== 'none' && node.offsetParent !== null);
}

export function distinct(element, index, self) {
    return self.indexOf(element) === index;
}