defmodule ReactSurface do
  @moduledoc """
  Documentation for `ReactSurface`.
  """
  @spec ssr(String.t(), map()) :: String.t()
  def ssr(component_name, props) do
    Application.ensure_all_started(:node_ssr)

    {:ok, %{markup: html}} = NodeSsr.render(component_name, props)
    html
  end

  @spec hash_id(String.t()) ::   String.t()
  def hash_id(str), do: :crypto.hash(:sha, str) |> Base.encode16() |> String.slice(0,8)
end
