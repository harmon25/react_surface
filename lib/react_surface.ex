defmodule ReactSurface do
  @moduledoc """
  Documentation for `ReactSurface`.
  """
  def ssr(component_name \\ "HelloReactSurface.js", props \\ %{}, opts \\ []) do
    opts = Keyword.merge(opts, default_opts())
    ssr_script = "assets/ssr.js"

    component_name = "#{opts[:component_path]}/#{component_name}"

    {component_str, 0} =
      System.cmd(
        "node",
        [ssr_script, component_name, Jason.encode!(props)],
        env: [
          {"NODE_PATH", opts[:node_path]}
        ]
      )

    component_str
  end

  def default_opts() do
    cwd = File.cwd!()
    [node_path: "#{cwd}/assets/node_modules", component_path: "#{cwd}/assets/js/components"]
  end
end
