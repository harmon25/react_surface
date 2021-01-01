// require("@babel/polyfill");
// require("@babel/register")({ cwd: __dirname });

const ReactServer = require("react-dom/server");
const React = require("react");
const path = require("path");

if (typeof window === "undefined") {
  global.window = {};
}

function render(cpath, props = "{}") {
  const component = require(cpath);
  // console.log(component);
  const element = component.default ? component.default : component;
  const createdElement = React.createElement(element, JSON.parse(props));

  console.log(ReactServer.renderToString(createdElement));
}

module.exports = { render };
