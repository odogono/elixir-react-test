defmodule ElixirReactTest.Repo do
  use Ecto.Repo,
    otp_app: :elixir_react_test,
    adapter: Ecto.Adapters.SQLite3
end
