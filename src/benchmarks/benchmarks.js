// import Test from "./test/test";
import LinkCount from "./link-count/link-count.js";

class Benchmarks {
    benchmarks = [
        LinkCount
    ];

    evaluate = () => {
        let result = this.benchmarks.map((benchmark) => {
            return this.p(`${benchmark.getLabel()}: ${benchmark.execute()}`);
        }) || [];
        return result;
    };

    p = (text) => {
        let elem = document.createElement('p');
        elem.innerHTML = text;
        return elem;
    };
}

export default new Benchmarks();
