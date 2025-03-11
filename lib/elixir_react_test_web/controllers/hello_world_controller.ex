defmodule ElixirReactTestWeb.HelloWorldController do
  use ElixirReactTestWeb, :controller

  def index(conn, _params) do
    conn
    |> assign_prop(:place, "Crediton")
    |> assign_prop(
      :facts,
      inertia_lazy(fn ->
        [
          %{"key" => "Mass", "value" => "5.972 × 10^24 kg"},
          %{"key" => "Radius", "value" => "6,371 km"}
        ]
      end)
    )
    |> render_inertia("HelloWorldPage")
  end
end
