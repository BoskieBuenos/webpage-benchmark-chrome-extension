export function isVisible(node) {
    var style = window.getComputedStyle(node);
    return (style.display !== 'none');
}
