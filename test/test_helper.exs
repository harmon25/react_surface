ExUnit.start()

defmodule Router do
  use Phoenix.Router
end

defmodule Endpoint do
  use Phoenix.Endpoint, otp_app: :react_surface
  plug(Router)
end

Application.put_env(:react_surface, Endpoint,
  secret_key_base: "J4lTFt000ENUVhu3dbIB2P2vRVl2nDBH6FLefnPUImL8mHYNX8Kln/N9J0HH19Mq",
  live_view: [
    signing_salt: "LfCCMxfkGME8S8P8XU3Z6/7+ZlD9611u"
  ]
)

# Application.ensure_all_started(:node_ssr)

Endpoint.start_link()
