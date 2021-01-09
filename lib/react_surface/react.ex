defmodule ReactSurface.React do
  @moduledoc """
  Container for rendering and interacting with a react component tree in a LiveView/Surface app.

  # SSR prop should not be set manually - is done automatically when using the SSR macro
  """
  use Surface.Component

  prop rid, :string
  prop component, :string
  prop props, :map, default: %{}
  prop container_class, :css_class, default: []
  prop opts, :keyword, default: []
  prop ssr, :boolean, default: false
  slot default

  def render(assigns) do
    ~H"<div class={{@container_class}} :attrs={{build_attrs(assigns)}}><div phx-update=\"ignore\" :attrs={{ [id: build_react_id(assigns)] }}><slot/></div></div>"
  end

  defp build_attrs(
         %{component: component, props: props_map} = props,
         other_attrs \\ []
       ) do
    # encode props into a base64 encoded string, should be more efficient on the wire, and better easier diffs than the htmlsafe raw json string.
    encoded_props = Jason.encode!(props_map) |> Base.encode64(padding: false)

    Keyword.merge(other_attrs,
      id: build_id(props),
      "rs-c": component,
      "rs-p": encoded_props,
      "phx-hook": hook_name(props)
    )
  end

  # hydration hook
  defp hook_name(%{ssr: true}), do: "__RSH"
  # clientside render hook
  defp hook_name(%{ssr: false}), do: "__RSR"
  defp build_id(%{rid: nil, component: comp}), do: comp
  defp build_id(%{rid: id, component: comp}), do: "#{id}_#{comp}"
  defp build_react_id(assigns), do: build_id(assigns) <> "_rs"
end
