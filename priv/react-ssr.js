const {renderToString} = require("react-dom/server");
const {createElement} = require("react");

if (typeof window === "undefined") {
  global.window = {};
}

function render(cpath, props) {
  try {
    const component = require(cpath);
    const element = component.default ? component.default : component;
    const markup = renderToString(createElement(element, props));

    return { markup, error: null, props, extra: null };
  } catch (e) {
    return {
      markup: null,
      component: null,
      extra: null,
      error: { type: e.constructor.name, message: e.message, stack: e.stack },
    };
  }
}

module.exports = { render };
