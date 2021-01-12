/**
 * React SSR script, requires a component, and renders to a html string.
 * Used by NodeSSR as the render function.
 */
const { renderToString } = require("react-dom/server");
const { createElement } = require("react");
const startService = require("elixir-node-ssr");

// provide a window object...
if (typeof window === "undefined") {
  global.window = {};
}

function render(componentName, props) {
  // grabs this from the environment - injected via node_ssr
  const { COMPONENT_EXT, COMPONENT_PATH } = process.env;
  // should just take component name, and from that resolve the path...
  try {
    const componentPath = componentName.endsWith(COMPONENT_EXT)
      ? `${COMPONENT_PATH}/${componentName}`
      : `${COMPONENT_PATH}/${componentName}${COMPONENT_EXT}`;

    const component = require(componentPath);
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

module.exports = { render, startService };
