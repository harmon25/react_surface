require("@babel/register")({ cwd: __dirname });
// starts local http service to perform Node SSR
const startService = require("elixir-node-ssr");
// a render function that takes a component name + props and returns a json response
const { render } = require("react-surface/priv/react-ssr");

const opts = {
  debug: false,
};

// starts listening on a random tcp port for render requests
startService(render, opts);