import * as Showdown from "showdown";

const converter = new Showdown.Converter({
    // tables: true,
    simplifiedAutoLink: true,
    parseImgDimensions: true,
    // simpleLineBreaks: true,
    // strikethrough: true,
    // tasklists: true
});

export default converter