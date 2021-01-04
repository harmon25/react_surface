defmodule Mix.Tasks.CleanSsrScripts do
  @moduledoc "Generates the ssr script for your assets directory"

  use Mix.Task

  def run(_args) do
    ["#{File.cwd!()}/assets/ssr.js", "#{File.cwd!()}/start_dev_server.sh"]
    |> Enum.each(&File.rm!(&1))
  end
end
