import {notDisplayPanel, isVisible} from "../filters.js";
import getNavigationDepths from "../../metrics/1-multi-level-navigation/navigation-levels.js";

class MultiLevelNavigation {
    getLabel = () => {
        return "1. Multi Level Navigation";
    };

    execute = () => {
        let maxDepth = getNavigationDepths().filter(n => notDisplayPanel(n.navContainer)).reduce((maxDepthCont, contDepth) =>
            contDepth.depth > maxDepthCont.depth ? contDepth : maxDepthCont
        , {});

        return `Max depth is ${maxDepth.depth}`;
    };
}

export default new MultiLevelNavigation();
