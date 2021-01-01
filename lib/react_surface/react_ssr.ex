defmodule ReactSurface.ReactSSR do
  @moduledoc """
  Container for rendering and interacting with a react component tree in a LiveView/Surface app.

  Would like to leverage a macro to perform a server render at compile time to avoid the initial page flash...
  """
  use Surface.MacroComponent
  alias Surface.MacroComponent
  # use Surface.Component

  prop id, :string
  prop component, :string, required: true
  prop props, :map, default: %{}
  prop opts, :keyword, default: []
  prop hook_name, :string, default: "__ReactSurfaceHydrate"

  def expand(attributes, _children, meta) do
    props = MacroComponent.eval_static_props!(__MODULE__, attributes, meta.caller)
    # class = props[:class] || get_config(:default_class)

    str =
      ReactSurface.ssr(props.component, props[:props] || %{})
      |> String.trim()

    node = %Surface.AST.Literal{value: str}

    %Surface.AST.Tag{
      element: "div",
      directives: [],
      attributes: [
        %Surface.AST.Attribute{
          name: "id",
          value: %Surface.AST.Literal{value: props.component}
        },
        %Surface.AST.Attribute{
          name: "phx-hook",
          value: %Surface.AST.Literal{value: props[:hook_name] || "__ReactSurfaceHydrate"}
        },
        %Surface.AST.Attribute{
          name: "rs-comp",
          value: %Surface.AST.Literal{
            value: "[\"#{Path.rootname(props.component)}\",{\"name\":\"Doug\"}]"
          }
        }
      ],
      children: [
        %Surface.AST.Tag{
          element: "div",
          directives: [],
          attributes: [
            %Surface.AST.Attribute{
              name: "id",
              value: %Surface.AST.Literal{value: "#{props.component}_rs"}
            },
            %Surface.AST.Attribute{
              name: "phx-update",
              value: %Surface.AST.Literal{value: "ignore"}
            }
          ],
          children: [
            node
          ],
          meta: meta
        }
      ],
      meta: meta
    }
  end

  # def render(%{container: :div} = assigns) do
  #   ~H"""
  #   <div class={{@container_class}} :attrs={{build_attrs(assigns)}}><div id={{build_react_id(assigns)}} phx-update="ignore"/></div>
  #   """
  # end

  # def render(%{container: :span} = assigns) do
  #   ~H"""
  #   <span class={{@container_class}} :attrs={{build_attrs(assigns)}}><div id={{build_react_id(assigns)}} phx-update="ignore"/></span>
  #   """
  # end

  # def render(%{container: :p} = assigns) do
  #   ~H"""
  #   <p class={{@container_class}} :attrs={{build_attrs(assigns)}}><div id={{build_react_id(assigns)}} phx-update="ignore"/></p>
  #   """
  # end

  defp build_attrs(
         %{component: component, props: props_map, hook_name: hkname} = props,
         other_attrs \\ []
       ) do
    encoded = Jason.encode!([component, props_map])

    Keyword.merge(other_attrs, "rs-comp": encoded, "phx-hook": hkname, id: build_id(props))
  end

  defp build_id(%{id: nil, component: comp}), do: comp
  defp build_id(%{id: id, component: comp}), do: "#{id}_#{comp}"
  defp build_react_id(assigns), do: build_id(assigns) <> "_rs"
end
