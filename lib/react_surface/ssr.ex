defmodule ReactSurface.SSR do
  @moduledoc """
  Macro to transform a module into a server rendered react component with some default props.

  ```elixir
  defmodule ReactComponent do
    use ReactSurface.SSR, [default_props: %{name: "Doug"}]
  end
  ```
  This assumes there is a react component that is the default export of a js module with the same name.

  The expected location is `assets/js/components/`

  The above example would import and generate static markup based on the react component located:
  `assets/js/components/ReactComponent.js` with the props `{"name": "Doug"}`

  ```js
  export default ({name}) => <h1> Hi {name}</h1>
  ```

  Which can now be used in any surface component
  ```elixir
  ~H\"\"\"
   <ReactComponent id="a_unique_id" props={{@dynamic_props}}/>
  \"\"\"
  ```
  """

  defmacro __using__(opts) do
    quote bind_quoted: [opts: opts] do
      Module.register_attribute(__MODULE__, :rendered_content, accumulate: false)
      use Surface.Component

      alias ReactSurface.React

      prop rid, :string, required: true
      prop props, :map, default: %{}
      prop container_class, :css_class, default: []

      @impl true
      def render(var!(assigns)) do
        ~H"""
        <React rid={{@rid}} ssr={{true}} container_class={{@container_class}} component={{component_name()}} props={{@props}}>{{ {:safe, get_ssr()} }}</React>
        """
      end

      @component_name Module.split(__MODULE__) |> List.last()


      Module.put_attribute(
        __MODULE__,
        :rendered_content,
        ReactSurface.ssr(
          @component_name,
          opts[:default_props],
          Keyword.merge(ReactSurface.default_opts(), opts)
        )
      )

      def get_ssr() do
        @rendered_content
      end

      def component_name() do
        Module.split(__MODULE__) |> List.last()
      end
    end
  end
end
