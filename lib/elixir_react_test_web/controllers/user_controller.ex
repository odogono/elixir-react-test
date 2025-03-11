defmodule ElixirReactTestWeb.UserController do
  use ElixirReactTestWeb, :controller

  alias ElixirReactTest.Accounts
  alias ElixirReactTest.Accounts.User

  def index(conn, _params) do
    users = Accounts.list_users()
    json(conn, ElixirReactTestWeb.UserJSON.index(%{users: users}))
  end

  def create(conn, params) do
    # IO.inspect(conn, label: "[UserController] create conn")
    # IO.inspect(params, label: "[UserController] create params")
    # Handle both JSON and form data formats
    user_params =
      case params do
        %{"user" => user_params} -> user_params
        # Handle direct parameters from form data
        _ -> params
      end

    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User created successfully")
        |> render_inertia("HelloWorldPage")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> render_inertia("HelloWorldPage")
    end
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
