defmodule ReactSurface do
  @moduledoc """
  Documentation for `ReactSurface`.
  """
  def ssr(component_name \\ "HelloReactSurface.js", props, opts \\ []) do
    # start up node worker - for use in compilation - but not runtime.
    {:ok, pid} = NodeJS.start_link(path: "#{File.cwd!()}/assets", pool_size: 1)
    opts = Keyword.merge(opts, default_opts())

    component_name = "#{opts[:component_path]}/#{component_name}"

    {:ok, %{"markup" => html}} =
      NodeJS.call({:ssr, :render}, [component_name, props], binary: true)

    # kill this after we are done calling it.
    Process.exit(pid, :normal)

    html
  end

  def default_opts() do
    cwd = File.cwd!()
    [node_path: "#{cwd}/assets/node_modules", component_path: "#{cwd}/assets/js/components"]
  end
end
