import { render, screen, within } from "@testing-library/react";
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

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: /leanne graham/i })).toHaveAttribute(
      "href",
      "/users/1?query=leanne&sort=pending-desc"
    );
    expect(within(table).getByText("8")).toBeInTheDocument();
    expect(within(table).getByText("4")).toBeInTheDocument();
    expect(within(table).getByText("2")).toBeInTheDocument();
  });

  it("shows an empty state when no users are passed", () => {
    render(<UsersTable users={[]} detailSearchParams="" />);

    expect(screen.getAllByText(/no users found/i).length).toBeGreaterThan(0);
  });

  it("renders a detail link without query params when none are provided", () => {
    render(<UsersTable users={mockUsers} detailSearchParams="" />);

    const table = screen.getByRole("table");

    expect(within(table).getByRole("link", { name: /leanne graham/i })).toHaveAttribute(
      "href",
      "/users/1"
    );
  });
});