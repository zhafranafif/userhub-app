import { mapSingleUserData, mapUserData } from "@/service/user-mapper.service";
import { getPosts, getTodos, getUserById, getUsers } from "@/service/users.service";
import type { IPost, ITodo, IUser } from "@/lib/types";

jest.mock("@/service/users.service", () => ({
	getPosts: jest.fn(),
	getTodos: jest.fn(),
	getUserById: jest.fn(),
	getUsers: jest.fn(),
}));

const mockedGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;
const mockedGetPosts = getPosts as jest.MockedFunction<typeof getPosts>;
const mockedGetTodos = getTodos as jest.MockedFunction<typeof getTodos>;
const mockedGetUserById = getUserById as jest.MockedFunction<typeof getUserById>;

const mockUsers: IUser[] = [
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
	},
	{
		id: 2,
		name: "Ervin Howell",
		email: "ervin@example.com",
		website: "ervin.dev",
		address: {
			street: "Victor Plains",
			suite: "Suite 879",
			city: "Wisokyburgh",
			zipcode: "90566-7771",
			geo: {
				lat: "-43.9509",
				lng: "-34.4618",
			},
		},
		phone: "010-692-6593 x09125",
		company: {
			name: "Deckow-Crist",
			catchPhrase: "Proactive didactic contingency",
			bs: "synergize scalable supply-chains",
		},
	},
];

const mockPosts: IPost[] = [
	{ id: 1, userId: 1, title: "Post 1", body: "Body 1" },
	{ id: 2, userId: 1, title: "Post 2", body: "Body 2" },
	{ id: 3, userId: 2, title: "Post 3", body: "Body 3" },
];

const mockTodos: ITodo[] = [
	{ id: 1, userId: 1, title: "Todo 1", completed: true },
	{ id: 2, userId: 1, title: "Todo 2", completed: false },
	{ id: 3, userId: 1, title: "Todo 3", completed: false },
	{ id: 4, userId: 2, title: "Todo 4", completed: true },
];

describe("user-mapper.service", () => {
	beforeEach(() => {
		mockedGetUsers.mockReset();
		mockedGetPosts.mockReset();
		mockedGetTodos.mockReset();
		mockedGetUserById.mockReset();
	});

	it("maps users with derived post and todo counts", async () => {
		mockedGetUsers.mockResolvedValue(mockUsers);
		mockedGetPosts.mockResolvedValue(mockPosts);
		mockedGetTodos.mockResolvedValue(mockTodos);

		await expect(mapUserData()).resolves.toEqual([
			{
				...mockUsers[0],
				totalPosts: 2,
				completedTodos: 1,
				pendingTodos: 2,
			},
			{
				...mockUsers[1],
				totalPosts: 1,
				completedTodos: 1,
				pendingTodos: 0,
			},
		]);
	});

	it("returns null for a missing single user", async () => {
		mockedGetUserById.mockResolvedValue(undefined as unknown as IUser);

		await expect(mapSingleUserData(99)).resolves.toBeNull();
		expect(mockedGetPosts).not.toHaveBeenCalled();
		expect(mockedGetTodos).not.toHaveBeenCalled();
	});

	it("maps a single user with derived counts", async () => {
		mockedGetUserById.mockResolvedValue(mockUsers[0]);
		mockedGetPosts.mockResolvedValue(mockPosts);
		mockedGetTodos.mockResolvedValue(mockTodos);

		await expect(mapSingleUserData(1)).resolves.toEqual({
			...mockUsers[0],
			totalPosts: 2,
			completedTodos: 1,
			pendingTodos: 2,
		});
	});
});