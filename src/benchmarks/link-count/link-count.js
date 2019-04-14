class LinkCount {
    getLabel = () => {
        return "Link count";
    };

    execute = () => {
        return document.getElementsByTagName("A").length;
    };
}

export default new LinkCount();