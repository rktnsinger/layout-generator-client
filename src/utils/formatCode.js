import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

const formatCode = (code) => {
  return prettier.format(code, {
    parser: "html",
    plugins: [parserHtml],
  });
};

export default formatCode;
