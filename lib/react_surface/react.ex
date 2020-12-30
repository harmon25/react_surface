defmodule ReactSurface.React do
  use Surface.Component

  prop component, :string, required: true
  prop props, :map, default: %{}
  prop container_class, :css_class, default: []
  prop opts, :keyword, default: []
  prop container, :atom, values: [:div, :span, :p], default: :div

  def render(%{container: :div} = assigns) do
    ~H"""
    <div class={{@container_class}} :attrs={{build_attrs(assigns)}}/>
    """
  end

  def render(%{container: :span} = assigns) do
    ~H"""
      <span class={{@container_class}} :attrs={{build_attrs(assigns)}}/>
    """
  end

  def render(%{container: :p} = assigns) do
    ~H"""
      <p class={{@container_class}} :attrs={{build_attrs(assigns)}}/>
    """
  end

  defp build_attrs(%{component: component, props: props_map}, other_attrs \\ []) do
    encoded = [component, props_map]
    |> Jason.encode!()

    ["rs-comp": encoded ]
    |> Keyword.merge(other_attrs)
  end
end
