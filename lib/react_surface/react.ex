defmodule ReactSurface.React do
  use Surface.Component

  prop id, :string
  prop component, :string, required: true
  prop props, :map, default: %{}
  prop container_class, :css_class, default: []
  prop opts, :keyword, default: []
  prop container, :atom, values: [:div, :span, :p], default: :div
  prop binding_prefix, :string, default: "phx"
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

  defp build_attrs(%{component: component, props: props_map, binding_prefix: prefix, hook_name: hkname} = props, other_attrs \\ []) do
    encoded = [component, props_map]
    |> Jason.encode!()

    other_attrs
    |> Keyword.merge(["rs-comp": encoded, "#{prefix}-hook": hkname, id: build_id(props)])
  end


  defp build_id(%{id: nil, component: comp}), do: comp
  defp build_id(%{id: id, component: comp}), do: "#{id}_#{comp}"
end
