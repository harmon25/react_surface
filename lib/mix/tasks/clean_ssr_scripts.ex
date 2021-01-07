defmodule Mix.Tasks.CleanSsrScripts do
  @moduledoc "Cleans ssr script from assets directory"

  use Mix.Task

  def run(_args) do
    ["#{File.cwd!()}/assets/ssr.js"]
    |> Enum.each(&File.rm!(&1))
  end
end
