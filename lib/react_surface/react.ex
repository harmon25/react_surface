defmodule ReactSurface.React do
  @moduledoc """
  Container for rendering and interacting with a react component tree in a LiveView/Surface app.

  Would like to leverage a macro to perform a server render at compile time to avoid the initial page flash...
  """

  use Surface.Component

  prop id, :string
  prop component, :string, required: true
  prop props, :map, default: %{}
  prop container_class, :css_class, default: []
  prop opts, :keyword, default: []
  prop container, :atom, values: [:div, :span, :p], default: :div
  prop hook_name, :string, default: "__ReactSurface"

  def render(%{container: :div} = assigns) do
    ~H"""
    <div class={{@container_class}} :attrs={{build_attrs(assigns)}}><div phx-update="ignore"/></div>
    """
  end

  def render(%{container: :span} = assigns) do
    ~H"""
    <span class={{@container_class}} :attrs={{build_attrs(assigns)}}><div phx-update="ignore"/></span>
    """
  end

  def render(%{container: :p} = assigns) do
    ~H"""
    <p class={{@container_class}} :attrs={{build_attrs(assigns)}}><div phx-update="ignore"/></p>
    """
  end

  defp build_attrs(%{component: component, props: props_map, hook_name: hkname} = props, other_attrs \\ []) do
    encoded = Jason.encode!([component, props_map])

    Keyword.merge(other_attrs, ["rs-comp": encoded, "phx-hook": hkname, id: build_id(props)])
  end

  defp build_id(%{id: nil, component: comp}), do: comp
  defp build_id(%{id: id, component: comp}), do: "#{id}_#{comp}"
end
