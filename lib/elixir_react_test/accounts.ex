defmodule ElixirReactTest.Accounts do
  alias ElixirReactTest.Accounts.User
  alias ElixirReactTest.Repo

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user(id) do
    Repo.get(User, id)
  end

  def update_user(user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def list_users do
    Repo.all(User)
    |> Enum.filter(&(&1.status != :logically_deleted))
  end

  def delete_user(id) do
    case Repo.get(User, id) do
      nil ->
        {:error, :not_found}

      user ->
        user
        |> User.changeset(%{status: :logically_deleted})
        |> Repo.update()
    end
  end
end
