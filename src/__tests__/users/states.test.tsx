import { render, screen } from "@testing-library/react";
import UsersLoading from "@/app/users/loading";
import UsersError from "@/app/users/error";
import UserDetailLoading from "@/app/users/[slug]/loading";
import UserDetailError from "@/app/users/[slug]/error";

describe("Users route states", () => {
  it("renders the users loading skeleton", () => {
    const { container } = render(<UsersLoading />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(container.querySelector(".grid-cols-6")).toBeInTheDocument();
  });

  it("renders the users error state", () => {
    render(<UsersError error={new Error("Failed to fetch users")} reset={jest.fn()} />);

    expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("renders the user detail loading skeleton", () => {
    const { container } = render(<UserDetailLoading />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(container.querySelector(".max-w-sm")).toBeInTheDocument();
  });

  it("renders the user detail error state", () => {
    render(<UserDetailError error={new Error("Failed to fetch user detail")} reset={jest.fn()} />);

    expect(screen.getByText(/failed to fetch user detail/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});