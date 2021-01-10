defmodule ReactSurface.React do
  @moduledoc """
  Container for rendering and interacting with a react component tree in a LiveView/Surface app.
  """
  use Surface.Component

  @doc "React ID - used to generate a unique DOM ID used for container elements, uses component name if not supplied"
  prop rid, :string

  @doc "Name of component, should exist as a key in the components object passed to the `buildHook` js function"
  prop component, :string

  @doc "Props passed to the react component"
  prop props, :map, default: %{}

  @doc "Class for container div"
  prop container_class, :css_class, default: []

  @doc "Passed to container div :attrs"
  prop opts, :keyword, default: []

  @doc "Used by SSR macro, do not set manually"
  prop ssr, :boolean, default: false

  @doc "Used by SSR macro, do not set manually"
  slot default

  def render(assigns) do
    id = build_id(assigns)
    ~H"<div class={{@container_class}} :attrs={{build_attrs(%{assigns | id: id},  @opts )}}><div phx-update=\"ignore\" :attrs={{ [id: \"r\" <> id] }}><slot/></div></div>"
  end

  defp build_attrs(
         %{component: component, props: props_map, id: id} = props,
         other_attrs
       ) do
    # encode props into a base64 encoded string, should be more efficient on the wire, and better easier diffs than the htmlsafe raw json string.
    encoded_props = Jason.encode!(props_map) |> Base.encode64(padding: false)

    Keyword.merge(other_attrs,
      id: id,
      "rs-c": component,
      "rs-p": encoded_props,
      "phx-hook": hook_name(props)
    )
  end

  # hydration hook
  defp hook_name(%{ssr: true}), do: "_RSH"
  # clientside render hook
  defp hook_name(%{ssr: false}), do: "_RSR"
  defp build_id(%{rid: nil, component: comp}), do: ReactSurface.hash_id(comp)
  defp build_id(%{rid: id, component: comp}), do: ReactSurface.hash_id("#{id}#{comp}")

end
