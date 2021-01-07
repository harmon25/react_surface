defmodule Mix.Tasks.GenSsrScript do
  @moduledoc "Generates the ssr script for your assets directory"

  use Mix.Task

  def run(_args) do
    contents = """
    #!/bin/env node

    require("@babel/register")({ cwd: __dirname });
    // starts local http service to perform Node SSR
    const startService = require("elixir-node-ssr");
    // a render function that takes a component name + props and returns a json response
    const { render } = require("react-surface/priv/react-ssr");

    const opts = {
      port: process.argv[2] ? parseInt(process.argv[2]) : 8080,
      debug: false,
    };

    // starts listening on port for render requests
    startService(render, opts);
    """

    outfile = "#{File.cwd!()}/assets/ssr.js"

    File.write!(outfile, contents)
    # make file executable.
    File.chmod(outfile, 0o755)
  end
end
