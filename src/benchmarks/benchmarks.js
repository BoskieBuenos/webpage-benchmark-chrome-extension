// import Test from "./test/test";
import MultiLevelNavigation from "./1-multi-level-navigation/1-multi-level-navigation.js";
import ComplexRegularForm from "./2-complex-form/2-1-regular-form.js";
import TooMuchGoingOn from "./8-too-much-going-on/8-too-much-going-on.js";
import TooLittleGoingOn from "./9-too-little-going-on/9-too-little-going-on.js";
import InconsistentDesign from "./10-too-confusing-unclear-hierarchy-inconsistency/10.1-inconsistent-design.js";
import BadComposition from "./10-too-confusing-unclear-hierarchy-inconsistency/10.2-bad-composition.js";
import ConfusingLinks from "./10-too-confusing-unclear-hierarchy-inconsistency/10.3-confusing-links.js";
import UnclearActionLabels from "./10-too-confusing-unclear-hierarchy-inconsistency/10.4-unclear-action-labels.js";
import TooManyCtas from "./11-annoying-unclear-call-to-action/11.1-too-many-ctas.js";
import TooSmallCtas from "./11-annoying-unclear-call-to-action/11.2-small-ctas.js";
import UglyImages from "./12-ugly-irrelevant-images/12-ugly-irrelevant-images.js";
import LackOfContactInfo from "./13-lack-of-contact-info/13-lack-of-contact-info.js";
import AdsInAllTheWrongPlaces from "./14-ads/14-ads.js";
import LackOfHeadings from "./18-lack-of-headings/18-lack-of-headings.js";
import TooLongParagraphs from "./19-too-long-paragraphs/19-too-long-paragraphs.js";
import SmallFont from "./20-lack-of-legibility/20.1-small-font.js";
import LowBackgroundFontContrast from "./20-lack-of-legibility/20.2-low-background-font-contrast.js";
import TooMuchCenteredText from "./21-too-much-centered-text/21-too-much-centered-text.js";
import FixedBarTooBigCoveringContent from "./23-fixed-bar-too-big-covering-content/23-fixed-bar-too-big-covering-content.js";
import NotUnderstandableTerminology from "./24-not-understandable-terminology/24-not-understandable-terminology.js";
import NoSocialSignUp from "./25-no-social-signup/25-no-social-signup.js";
import BrokenLinks from "./26-broken-links/26-broken-links.js";
import LackOfPerformance from "./28-lack-of-performance/28-lack-of-performance.js";
import NoSearchBar from "./29-no-search-bar/29-no-search-bar.js";
import NoDefaultValues from "./30-no-default-values/30-no-default-values.js";
import NewWindowLinks from "./32-new-window-links/32-new-window-links.js";
import LowAccessibility from "./37-low-accessibility/37-low-accessibility.js";
import RequiredFieldsNotIndicated from "./39-required-fields-not-clearly-indicated/39-required-fields-not-clearly-indicated.js";
import LinkCount from "./link-count/link-count.js";
import H1 from "./h1/h1.js";
import AmbiguousLetterAbbreviation from "./ambiguous-letter-abbreviation/ambiguous-letter-abbreviation.js";

let runs = 0;

class Benchmarks {
    benchmarks = [
        MultiLevelNavigation,
        ComplexRegularForm,
        TooMuchGoingOn,
        TooLittleGoingOn,
        InconsistentDesign,
        BadComposition,
        ConfusingLinks,
        UnclearActionLabels,
        TooManyCtas,
        TooSmallCtas,
        UglyImages,
        LackOfContactInfo,
        AdsInAllTheWrongPlaces,
        LackOfHeadings,
        TooLongParagraphs,
        SmallFont,
        LowBackgroundFontContrast,
        // TooMuchCenteredText, // FIXME Extremely low performance
        FixedBarTooBigCoveringContent,
        NotUnderstandableTerminology,
        NoSocialSignUp,
        // BrokenLinks, // FIXME
        LackOfPerformance,
        NoSearchBar,
        NoDefaultValues,
        NewWindowLinks,
        LowAccessibility,
        RequiredFieldsNotIndicated,
        // LinkCount,
        // H1,
        // AmbiguousLetterAbbreviation // Same as NotUnderstandableTerminology
    ];

    getEntries = () => {
        return this.benchmarks.map((benchmark) => benchmark.getLabel());
    };

    getBenchmarks = () => {
        // TODO keep initialized objects
        return this.benchmarks;
    };

    evaluate = (performanceRegistry) => {
        let result = this.benchmarks.map((benchmark) => {
            return this.p(`${benchmark.getLabel()}: ${benchmark.execute({performanceRegistry})}`);
        }) || [];
        return result;
    };

    p = (text) => {
        let elem = document.createElement('p');
        elem.classList.add('wbce-benchmark');
        elem.innerHTML = text;
        return elem;
    };
}

export default Benchmarks;
