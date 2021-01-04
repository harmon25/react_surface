defmodule Mix.Tasks.GenSsrScripts do
  @moduledoc "Generates the ssr script for your assets directory"

  use Mix.Task

  def run(_args) do
    contents = """
    #!/bin/env node

    require("@babel/register")({ cwd: __dirname });
    // starts local http service to perform Node SSR
    const startService = require("react_surface/priv/ssr-service");
    // a render function that takes a component name + props and returns a json response
    const { render } = require("react_surface/priv/react-ssr");

    const opts = {
      port: process.argv[2] ? parseInt(process.argv[2]) : 8080,
      debug: false,
    };

    console.log(`Starting SSR Service on port ${opts.port}`);

    // starts listening on port for render requests
    startService(render, opts);
    """

    outfile = "#{File.cwd!()}/assets/ssr.js"

    File.write!(outfile, contents)
    # make file executable.
    File.chmod(outfile, 0o755)

    contents2 = """
    #!/bin/sh

    export NODE_PATH="./assets/node_modules:./assets"

    ./assets/ssr.js
    """

    outfile2 = "#{File.cwd!()}/start_dev_server.sh"

    File.write!(outfile2, contents2)
    # make file executable.
    File.chmod(outfile2, 0o755)
  end
end
