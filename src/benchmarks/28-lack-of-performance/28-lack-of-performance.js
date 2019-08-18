const longRequestThreshold = 1000;

class LackOfPerformance {
    getLabel = () => {
        return "28 Lack of performance";
    };

    execute = ({performanceRegistry}) => {
        // Get all requests taking more than longRequestThreshold
        let longRequests = performanceRegistry['resource'].filter(event => event.duration > longRequestThreshold);
        let longestRequest = Math.max(...performanceRegistry['resource'].map(event => event.duration));
        return `too long requests ${longRequests.length}, the longest ${parseInt(longestRequest)/1000}s`;
    }
}

export default new LackOfPerformance();
