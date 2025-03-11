defmodule ElixirReactTest.Accounts do
  alias ElixirReactTest.Accounts.User
  alias ElixirReactTest.Repo

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{name: "John", email: "john@example.com"})
      {:ok, %User{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def list_users do
    Repo.all(User)
  end
end
