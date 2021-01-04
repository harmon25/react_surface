defmodule DemoWeb.Simple do
  @moduledoc """
  Example of a compile time, server rendered component
  """
  use ReactSurface.SSR, [default_props: %{name: "Doug"} ]
end
