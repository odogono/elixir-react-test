defmodule ElixirReactTestWeb.UserController do
  use ElixirReactTestWeb, :controller

  alias ElixirReactTest.Accounts
  alias ElixirReactTest.Accounts.User

  def index(conn, _params) do
    users = Accounts.list_users()

    case get_format(conn) do
      "json" ->
        json(conn, ElixirReactTestWeb.UserJSON.index(%{users: users}))

      _ ->
        render_inertia(conn, "index", %{users: users})
    end
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
        |> assign_prop(:users, Accounts.list_users())
        |> render_inertia("home")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> render_inertia("home")
    end
  end

  def delete(conn, %{"id" => id}) do
    case Accounts.delete_user(String.to_integer(id)) do
      {:ok, _} ->
        conn
        |> put_flash(:info, "User deleted successfully")
        |> assign_prop(:users, Accounts.list_users())
        |> render_inertia("home")

      {:error, _} ->
        conn |> put_flash(:error, "Failed to delete user") |> render_inertia("home")
    end
  end

  def toggle_status(conn, %{"id" => id}) do
    case Accounts.get_user(String.to_integer(id)) do
      nil ->
        conn |> put_status(:not_found) |> json(%{error: "User not found"})

      user ->
        new_status = if user.status == :active, do: :inactive, else: :active

        case Accounts.update_user(user, %{status: new_status}) do
          {:ok, updated_user} ->
            conn
            # |> json(ElixirReactTestWeb.UserJSON.show(%{user: updated_user}))
            |> assign_prop(:users, Accounts.list_users())
            |> put_flash(:info, "User status updated to #{new_status}")
            |> render_inertia("home")

          {:error, _} ->
            conn |> put_status(:unprocessable_entity) |> render_inertia("home")
        end
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
