defmodule Mix.Tasks.GenSsrScript do
  @moduledoc "Generates the ssr script for your assets directory"

  use Mix.Task

  def run(_args) do
    source = Application.app_dir(:react_surface, "priv") <> "/ssr.js"
    dest = "#{File.cwd!()}/assets/ssr.js"
    File.cp!(source, dest)

    # make file executable.
    File.chmod(dest, 0o755)
  end
end
