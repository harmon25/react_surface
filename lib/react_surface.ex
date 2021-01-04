defmodule ReactSurface do
  @moduledoc """
  Documentation for `ReactSurface`.
  """

  @spec ssr(String.t(), map(), Keyword.t()) :: String.t()
  def ssr(component_name, props, opts \\ []) do
    %{markup: html} = fetch_component(component_name, props, opts)
    html
  end

  defp fetch_component(name, props, _opts) do
    Application.ensure_all_started(:httpoison)
    body = Jason.encode!(props)

    HTTPoison.post("http://localhost:8080/?component=#{name}", body)
    |> case do
      {:ok, %{status_code: 200, body: json_encoded_body}} -> Jason.decode!(json_encoded_body, keys: :atoms)
      _ -> raise "Error reaching js component server at localhost:8080"
    end

  end



  def default_opts() do
    script_path = "#{File.cwd!()}/assets"
    [ssr_script: script_path, component_path: "#{script_path}/js/components"]
  end
end
