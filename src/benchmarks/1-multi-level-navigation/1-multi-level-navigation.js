import {isVisible} from "../filters.js";
import getNavigationDepths from "../../metrics/1-multi-level-navigation/navigation-levels.js";

class MultiLevelNavigation {
    getLabel = () => {
        return "1. Multi Level Navigation";
    };

    execute = () => {
        let maxDepth = getNavigationDepths().reduce((maxDepthCont, contDepth) =>
            contDepth.depth > maxDepthCont.depth ? contDepth : maxDepthCont
        );

        // return `Max depth is ${Math.max(...getNavigationDepths().map(t => t.depth))}`;
        return `Max depth is ${maxDepth.depth}`;
    };
}

export default new MultiLevelNavigation();
