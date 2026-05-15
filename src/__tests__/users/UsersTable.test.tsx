import { render, screen } from "@testing-library/react";
import { UsersTable } from "@/component/UsersTable";
import type { IUserData } from "@/lib/types";

const mockUsers: IUserData[] = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "leanne@example.com",
    website: "leanne.dev",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    totalPosts: 8,
    completedTodos: 4,
    pendingTodos: 2,
  },
];

describe("UsersTable", () => {
  it("renders a user row with activity values and a preserved detail link", () => {
    render(<UsersTable users={mockUsers} detailSearchParams="query=leanne&sort=pending-desc" />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /leanne graham/i })).toHaveAttribute(
      "href",
      "/users/1?query=leanne&sort=pending-desc"
    );
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows an empty state when no users are passed", () => {
    render(<UsersTable users={[]} detailSearchParams="" />);

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("renders a detail link without query params when none are provided", () => {
    render(<UsersTable users={mockUsers} detailSearchParams="" />);

    expect(screen.getByRole("link", { name: /leanne graham/i })).toHaveAttribute(
      "href",
      "/users/1"
    );
  });
});