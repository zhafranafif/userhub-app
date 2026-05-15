import { render, screen, within } from "@testing-library/react";
import UsersPage from "@/app/users/page";
import { mapUserData } from "@/service/user-mapper.service";
import type { IUserData } from "@/lib/types";
import { notFound } from "next/navigation";

jest.mock("@/service/user-mapper.service", () => ({
	mapUserData: jest.fn(),
}));

jest.mock("@/component/SearchBar", () => ({
	SearchBar: () => <div data-testid="search-bar" />,
}));

jest.mock("@/component/FilterBar", () => ({
	FilterBar: () => <div data-testid="filter-bar" />,
}));

jest.mock("next/link", () => ({
	__esModule: true,
	default: ({ href, children }: { href: string; children: React.ReactNode }) => (
		<a href={href}>{children}</a>
	),
}));

jest.mock("next/navigation", () => ({
	notFound: jest.fn(),
}));

const mockedMapUserData = mapUserData as jest.MockedFunction<typeof mapUserData>;
const mockedNotFound = notFound as jest.MockedFunction<typeof notFound>;

const mockUsers: IUserData[] = [
	{
		id: 1,
		name: "Alice Johnson",
		email: "alice@example.com",
		website: "alice.dev",
		address: {
			street: "Main Street",
			suite: "Apt. 1",
			city: "Austin",
			zipcode: "78701",
			geo: {
				lat: "30.2672",
				lng: "-97.7431",
			},
		},
		phone: "111-111-1111",
		company: {
			name: "Alice Co",
			catchPhrase: "Build better things",
			bs: "business stuff",
		},
		totalPosts: 12,
		completedTodos: 7,
		pendingTodos: 4,
	},
	{
		id: 2,
		name: "Bob Smith",
		email: "bob@example.com",
		website: "bob.dev",
		address: {
			street: "Second Street",
			suite: "Suite 2",
			city: "Dallas",
			zipcode: "75201",
			geo: {
				lat: "32.7767",
				lng: "-96.7970",
			},
		},
		phone: "222-222-2222",
		company: {
			name: "Bob Inc",
			catchPhrase: "Ship faster",
			bs: "more business stuff",
		},
		totalPosts: 6,
		completedTodos: 5,
		pendingTodos: 1,
	},
];

describe("UsersPage", () => {
	beforeEach(() => {
		mockedMapUserData.mockReset();
		mockedNotFound.mockReset();
	});

	it("renders users, derived activity values, and sorts by pending todos", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "pending-desc" }),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Alice Johnson");
		expect(links[1]).toHaveTextContent("Bob Smith");
		expect(links[0]).toHaveAttribute("href", "/users/1?sort=pending-desc");
		expect(within(table).getByText("12")).toBeInTheDocument();
		expect(within(table).getByText("7")).toBeInTheDocument();
		expect(within(table).getByText("4")).toBeInTheDocument();
	});

	it("filters users by search query", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "bob", sort: "name-asc" }),
		});

		render(ui);

		const table = screen.getByRole("table");

		expect(within(table).getByRole("link", { name: /bob smith/i })).toBeInTheDocument();
		expect(within(table).queryByRole("link", { name: /alice johnson/i })).not.toBeInTheDocument();
	});

	it("shows the empty state when the filter removes all rows", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "zzz", sort: "name-asc" }),
		});

		render(ui);

		expect(screen.getAllByText(/no users found/i).length).toBeGreaterThan(0);
	});

	it("calls notFound when there are no users to render", async () => {
		mockedMapUserData.mockResolvedValue([]);

		await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "name-asc" }),
		});

		expect(mockedNotFound).toHaveBeenCalled();
	});

	it("renders the list with default sorting and no preserved query params when search params are empty", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({}),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Alice Johnson");
		expect(links[1]).toHaveTextContent("Bob Smith");
		expect(links[0]).toHaveAttribute("href", "/users/1");
	});

	it("sorts users by name descending", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "name-desc" }),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Bob Smith");
		expect(links[1]).toHaveTextContent("Alice Johnson");
	});

	it("sorts users by pending todos ascending", async () => {
		mockedMapUserData.mockResolvedValue(mockUsers);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "pending-asc" }),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Bob Smith");
		expect(links[1]).toHaveTextContent("Alice Johnson");
	});

	it("uses the alphabetical tie-breaker when pending todo counts match", async () => {
		mockedMapUserData.mockResolvedValue([
			{
				...mockUsers[0],
				name: "Zara Zero",
				pendingTodos: 2,
			},
			{
				...mockUsers[1],
				name: "Adam Alpha",
				pendingTodos: 2,
			},
		]);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "pending-desc" }),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Adam Alpha");
		expect(links[1]).toHaveTextContent("Zara Zero");
	});

	it("uses the alphabetical tie-breaker when pending todo counts match in ascending sort", async () => {
		mockedMapUserData.mockResolvedValue([
			{
				...mockUsers[0],
				name: "Zara Zero",
				pendingTodos: 2,
			},
			{
				...mockUsers[1],
				name: "Adam Alpha",
				pendingTodos: 2,
			},
		]);

		const ui = await UsersPage({
			searchParams: Promise.resolve({ query: "", sort: "pending-asc" }),
		});

		render(ui);

		const table = screen.getByRole("table");
		const links = within(table).getAllByRole("link");

		expect(links[0]).toHaveTextContent("Adam Alpha");
		expect(links[1]).toHaveTextContent("Zara Zero");
	});
});
