const ReactServer = require("react-dom/server");
const React = require("react");

if (typeof window === "undefined") {
  global.window = {};
}

function render(cpath, props) {
  try {
    const component = require(cpath);
    const element = component.default ? component.default : component;
    const createdElement = React.createElement(element, props);
    const markup = ReactServer.renderToString(createdElement);

    return { markup, error: null, component: element.name, props };
  } catch (e) {
    return {
      markup: null,
      component: null,
      error: { type: e.constructor.name, message: e.message, stack: e.stack },
    };
  }
}

module.exports = { render };
