require("@babel/register")({ cwd: __dirname });

const { render } = require("react_surface/priv/ssr");

render(process.argv[2], process.argv[3] || {});
