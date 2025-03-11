defmodule ElixirReactTest.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :email, :status]}
  schema "users" do
    field(:name, :string)
    field(:email, :string)

    field(:status, Ecto.Enum,
      values: [:inactive, :pending, :active, :logically_deleted],
      default: :inactive
    )

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :status])
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/)
    |> unique_constraint(:email)
  end
end
