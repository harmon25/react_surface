defmodule DemoWeb.HelloReactSurface do
  @moduledoc """
  Example of a compile time, server rendered component
  """
  use ReactSurface.SSR, [ssr_script: "#{File.cwd!()}/assets", component_path: "js/components", default_props: %{name: "Doug"} ]
end
