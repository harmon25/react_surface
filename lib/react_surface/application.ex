defmodule ReactSurface.Supervisor do
    use Supervisor

    def init(_opts) do
      children = [
        {Finch, name: ReactSurfaceFinch}
      ]

      Supervisor.init(children, strategy: :one_for_one)
    end
end
