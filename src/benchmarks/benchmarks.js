// import Test from "./test/test";
import LinkCount from "./link-count/link-count.js";
import H1 from "./h1/h1.js";
import AmbiguousLetterAbbreviation from "./ambiguous-letter-abbreviation/ambiguous-letter-abbreviation.js";

class Benchmarks {
    benchmarks = [
        LinkCount,
        H1,
        AmbiguousLetterAbbreviation
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
