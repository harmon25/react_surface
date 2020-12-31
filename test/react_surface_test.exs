defmodule ReactSurfaceTest do
  use ReactSurface.ConnCase, async: true
  # doctest ReactSurface
  alias ReactSurface.React

  defmodule View do
    use Surface.LiveView

    def render(assigns) do
      ~H"""
       <React component="HELLO" props={{ %{test: "props"} }}/>
      """
    end
  end

  test "rendering a container", %{conn: conn} do
    {:ok, _view, html} = live_isolated(conn, View)
    IO.inspect(html)
  end
end
