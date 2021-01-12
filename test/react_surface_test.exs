

defmodule ReactSurfaceTest do
  use ReactSurface.ConnCase, async: false
  # doctest ReactSurface
  alias ReactSurface.React

  defmodule Hello do
    @moduledoc """
    Test component, corresponding react component `components/Hello.js`
    """
    use ReactSurface.SSR, default_props: %{name: "HELLO"}
  end

  defmodule SSRView do
    use Surface.LiveView

    def render(assigns) do
      ~H"""
       <Hello props={{ %{name: "NEW NAME"} }}/>
      """
    end
  end

  defmodule View do
    use Surface.LiveView

    def render(assigns) do
      ~H"""
       <React component="Hello" props={{ %{test: "props"} }}/>
      """
    end
  end

  test "rendering a container", %{conn: conn} do
    encoded_props = Jason.encode!(%{test: "props"}) |> Base.encode64(padding: false)

    {:ok, _view, html} = live_isolated(conn, View)
    assert html =~ "id=\"rF7FF9E8B\" phx-update=\"ignore\""
    assert html =~ "rs-p=\"#{encoded_props}\""
    assert html =~ "rs-m=\"r\""
    assert html =~ "phx-hook=\"_RS\""
  end

  test "rendering a ssr container", %{conn: conn} do
    encoded_props = Jason.encode!(%{name: "NEW NAME"}) |> Base.encode64(padding: false)

    {:ok, _view, html} = live_isolated(conn, SSRView)
    assert html =~ "rs-p=\"#{encoded_props}\""
    assert html =~ "phx-hook=\"_RS\""
    assert html =~ "rs-m=\"h\""
    assert html =~ "<h1 data-reactroot=\"\">HELLO</h1>"
  end

end
