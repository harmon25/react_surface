require("@babel/register")({ cwd: __dirname });
// starts local http service to perform Node SSR
const { startService, render } = require("react-surface/priv/react-ssr");

const opts = {
  debug: false,
};

// starts listening on a random tcp port for render requests
startService(render, opts);