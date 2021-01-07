#!/bin/env node

require("@babel/register")({ cwd: __dirname });
// starts local http service to perform Node SSR
const startService = require("elixir-node-ssr");
// a render function that takes a component name + props and returns a json response
const { render } = require("react-surface/priv/react-ssr");

const opts = {
  port: process.argv[2] ? parseInt(process.argv[2]) : 8080,
  debug: true,
};

// starts listening on port for render requests
startService(render, opts);
