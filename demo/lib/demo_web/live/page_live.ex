defmodule DemoWeb.PageLive do
  # use DemoWeb, :live_view
  use Surface.LiveView
  alias ReactSurface.React
  alias DemoWeb.{HelloReactSurface, Simple}

  data component_props, :map, default: %{name: "Doug"}
  data show_react, :boolean, default: true

  @impl true
  def render(assigns) do
    ~H"""
    <div>
     <Simple id="simple_ssr" props={{@component_props}} />
     <React :if={{@show_react}} component="HelloReactSurface" props={{@component_props}}/>

     <button type="button" phx-click="toggle-react">Toggle React</button>
    </div>
    """
  end
  # <HelloReactSurface id="ssr" props={{@component_props}}/>

  #   <React :if={{@show_react}} component="HelloReactSurface" props={{@component_props}}/>
  # <HelloReactSurface id="ssr" props={{@component_props}}/>

  # <React :if={{@show_react}} component="Simple" props={{@component_props}}/>
  # <React :if={{@show_react}} component="HelloReactSurface" props={{@component_props}}/>
  # <React id="another" :if={{@show_react}} component="HelloReactSurface" props={{@component_props}}/>

  # @impl true
  # def handle_info({:update_name, name}, socket) do
  #   # test setting a new name from the server
  #   {:noreply, assign(socket, :component_props, %{name: name})}
  # end

  @impl true
  def handle_event("update_name", %{"new_name" => new_name}, socket) do
    # passes new component props - hydrating the component with new props - retaining internal state.
    {:noreply, assign(socket, :component_props,  %{name: new_name})}
  end

  @impl true
  def handle_event("toggle-react", _, socket) do
    # show and hide react element - test react node is 'destroyed' when lv removes parent from dom.
    {:noreply, assign(socket, :show_react, !socket.assigns.show_react)}
  end

  @impl true
  def handle_event("trigger-event", _, socket) do
    # receive data from within react component via handleEvent
    {:noreply, push_event(socket, "from_server", %{data_from_server: "WHOOA"})}
  end

end
