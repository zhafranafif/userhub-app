import { render, screen } from "@testing-library/react";
import UserDetailPage, { generateMetadata } from "@/app/users/[slug]/page";
import UserNotFound from "@/app/users/[slug]/not-found";
import { mapSingleUserData } from "@/service/user-mapper.service";
import { getPosts, getTodos } from "@/service/users.service";
import type { IUserData } from "@/lib/types";

jest.mock("@/service/user-mapper.service", () => ({
  mapSingleUserData: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/service/users.service", () => ({
  getPosts: jest.fn(),
  getTodos: jest.fn(),
}));

const mockedMapSingleUserData = mapSingleUserData as jest.MockedFunction<typeof mapSingleUserData>;
const mockedGetPosts = getPosts as jest.MockedFunction<typeof getPosts>;
const mockedGetTodos = getTodos as jest.MockedFunction<typeof getTodos>;

const mockUser: IUserData = {
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
};

describe("UserDetailPage", () => {
  beforeEach(() => {
    mockedMapSingleUserData.mockReset();
    mockedGetPosts.mockReset();
    mockedGetTodos.mockReset();
  });

  it("renders the user details with activity sections", async () => {
    mockedMapSingleUserData.mockResolvedValue(mockUser);
    mockedGetPosts.mockResolvedValue([
      { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
    ]);
    mockedGetTodos.mockResolvedValue([
      { id: 1, userId: 1, title: "Todo 1", completed: true },
      { id: 2, userId: 1, title: "Todo 2", completed: false },
    ]);

    const ui = await UserDetailPage({
      params: Promise.resolve({ slug: "1" }),
      searchParams: Promise.resolve({ query: "leanne", sort: "pending-desc" }),
    });

    render(ui);

    expect(screen.getByText(/leanne graham/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/company/i)).toBeInTheDocument();
    expect(screen.getByText(/8 total posts/i)).toBeInTheDocument();
    expect(screen.getByText(/4 completed todos/i)).toBeInTheDocument();
    expect(screen.getByText(/2 pending todos/i)).toBeInTheDocument();
    expect(screen.getByText(/activity/i)).toBeInTheDocument();
    expect(screen.getByText(/todo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/todo 2/i)).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to list/i })).toHaveAttribute(
      "href",
      "/users?query=leanne&sort=pending-desc"
    );
  });

  it("renders the not found fallback when the user data is missing", async () => {
    mockedMapSingleUserData.mockResolvedValue(null);
    mockedGetPosts.mockResolvedValue([]);
    mockedGetTodos.mockResolvedValue([]);

    const ui = await UserDetailPage({
      params: Promise.resolve({ slug: "999" }),
      searchParams: Promise.resolve({ query: "leanne", sort: "name-asc" }),
    });

    render(ui);

    expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to list/i })).toHaveAttribute(
      "href",
      "/users?query=leanne&sort=name-asc"
    );
  });

  it("renders the detail page back link without query params when search params are absent", async () => {
    mockedMapSingleUserData.mockResolvedValue(mockUser);
    mockedGetPosts.mockResolvedValue([]);
    mockedGetTodos.mockResolvedValue([]);

    const ui = await UserDetailPage({
      params: Promise.resolve({ slug: "1" }),
      searchParams: Promise.resolve({}),
    });

    render(ui);

    expect(screen.getByRole("link", { name: /back to list/i })).toHaveAttribute(
      "href",
      "/users"
    );
  });

  it("renders the not-found back link without query params when search params are absent", () => {
    render(<UserNotFound />);

    expect(screen.getByRole("link", { name: /back to list/i })).toHaveAttribute(
      "href",
      "/users"
    );
  });

  it("returns fallback metadata for an invalid user id", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "abc" }),
    });

    expect(metadata.title).toBe("User not found - UserHub");
    expect(metadata.description).toBe("The user you are looking for was not found.");
    expect(mockedMapSingleUserData).not.toHaveBeenCalled();
  });

  it("returns fallback metadata when the user is missing", async () => {
    mockedMapSingleUserData.mockResolvedValue(null);
    mockedGetPosts.mockResolvedValue([]);
    mockedGetTodos.mockResolvedValue([]);

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "999" }),
    });

    expect(metadata.title).toBe("User not found - UserHub");
    expect(metadata.description).toBe("The user you are looking for was not found.");
  });

  it("returns metadata for a valid user", async () => {
    mockedMapSingleUserData.mockResolvedValue(mockUser);
    mockedGetPosts.mockResolvedValue([]);
    mockedGetTodos.mockResolvedValue([]);

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "1" }),
    });

    expect(metadata.title).toBe("Leanne Graham - UserHub");
    expect(metadata.description).toBe("Details information for Leanne Graham");
  });

  it("renders the not found fallback for an invalid user id", async () => {
    mockedGetPosts.mockResolvedValue([]);
    mockedGetTodos.mockResolvedValue([]);
    const ui = await UserDetailPage({
      params: Promise.resolve({ slug: "abc" }),
      searchParams: Promise.resolve({ query: "leanne", sort: "name-asc" }),
    });

    render(ui);

    expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to list/i })).toHaveAttribute(
      "href",
      "/users?query=leanne&sort=name-asc"
    );
  });
});