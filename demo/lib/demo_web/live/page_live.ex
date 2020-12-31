defmodule DemoWeb.PageLive do
  # use DemoWeb, :live_view
  use Surface.LiveView
  alias ReactSurface.React

  data component_props, :map, default: %{name: "Doug"}
  data show_react, :boolean, default: true

  def mount(_params, _session, socket) do
    IO.inspect(self())
    {:ok, socket}
  end

  @impl true
  def handle_info({:update_name, name}, socket) do
    {:noreply, assign(socket, :component_props, %{name: name})}
  end

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
