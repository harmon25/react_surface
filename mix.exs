defmodule ReactSurface.MixProject do
  use Mix.Project

  def project do
    [
      app: :react_surface,
      version: "0.1.0",
      elixir: "~> 1.11",
      elixirc_paths: elixirc_paths(Mix.env()),
      package: package(),
      compilers: [:phoenix] ++ Mix.compilers(),
      description: description(),
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:jason, "~> 1.1"},
      {:surface, "~> 0.1.1"},
      {:node_ssr, github: "harmon25/node_ssr", branch: "main", runtime: false},
      {:floki, ">= 0.27.0", only: :test}
    ]
  end

  def description do
    """
    A helper library for rendering React components via Surface
    """
  end

  defp package do
    [
      name: :react_surface,
      files: ["lib", "priv", "mix.exs", "package.json", "README*", "LICENSE*"],
      maintainers: ["Doug W."],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/harmon25/react_surface"}
    ]
  end
end
