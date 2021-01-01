defmodule Mix.Tasks.GenSsr do
  @moduledoc "Generates the ssr script for your assets directory"

  use Mix.Task

  def run(_args) do
    contents = """
    require("@babel/register")({ cwd: __dirname });

    module.exports = require("react_surface/priv/ssr");
    """

    File.write!("#{File.cwd!()}/assets/ssr.js", contents)
  end
end
