import { getPosts, getTodos, getUserById, getUsers } from "@/service/users.service";

type MockResponse = {
	ok: boolean;
	status: number;
	json: () => Promise<unknown>;
};

describe("users.service", () => {
	const mockFetch = jest.fn();

	beforeEach(() => {
		mockFetch.mockReset();
		global.fetch = mockFetch as unknown as typeof fetch;
	});

	afterAll(() => {
		mockFetch.mockReset();
	});

	function setFetchResponse(response: MockResponse) {
		mockFetch.mockResolvedValue(response);
	}

	it("getUsers returns users when the response is valid", async () => {
		const users = [{ id: 1, name: "Leanne Graham" }];
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => users,
		});

		await expect(getUsers()).resolves.toEqual(users);
		expect(mockFetch).toHaveBeenCalledWith(
			"https://jsonplaceholder.typicode.com/users",
			expect.objectContaining({ method: "GET" })
		);
	});

	it("getUsers throws when the response is not ok", async () => {
		setFetchResponse({
			ok: false,
			status: 500,
			json: async () => [],
		});

		await expect(getUsers()).rejects.toThrow("Failed to fetch users");
	});

	it("getUsers throws when the data is not an array", async () => {
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => ({ message: "invalid" }),
		});

		await expect(getUsers()).rejects.toThrow("Invalid data format");
	});

	it("getUserById returns null for a 404 response", async () => {
		setFetchResponse({
			ok: false,
			status: 404,
			json: async () => null,
		});

		await expect(getUserById(7)).rejects.toThrow("User with id: 7 not found");
	});

	it("getUserById throws when the response is not ok for another status", async () => {
		setFetchResponse({
			ok: false,
			status: 500,
			json: async () => null,
		});

		await expect(getUserById(7)).rejects.toThrow("Failed to fetch user with id: 7");
	});

	it("getUserById throws when the response body is invalid", async () => {
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => null,
		});

		await expect(getUserById(7)).rejects.toThrow("Invalid user data for id: 7");
	});

	it("getUserById throws when the response body is not an object", async () => {
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => "invalid",
		});

		await expect(getUserById(7)).rejects.toThrow("Invalid user data for id: 7");
	});

	it("getUserById returns the user when the response is valid", async () => {
		const user = { id: 7, name: "User", email: "user@example.com" };
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => user,
		});

		await expect(getUserById(7)).resolves.toEqual(user);
	});

	it("getPosts returns posts when the response is valid", async () => {
		const posts = [{ id: 1, userId: 1, title: "Post", body: "Body" }];
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => posts,
		});

		await expect(getPosts()).resolves.toEqual(posts);
	});

	it("getPosts throws when the response is not ok", async () => {
		setFetchResponse({
			ok: false,
			status: 500,
			json: async () => [],
		});

		await expect(getPosts()).rejects.toThrow("Failed to fetch posts");
	});

	it("getPosts throws when the data is not an array", async () => {
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => ({ message: "invalid" }),
		});

		await expect(getPosts()).rejects.toThrow("Invalid data format");
	});

	it("getTodos returns todos when the response is valid", async () => {
		const todos = [{ id: 1, userId: 1, title: "Todo", completed: false }];
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => todos,
		});

		await expect(getTodos()).resolves.toEqual(todos);
	});

	it("getTodos throws when the response is not ok", async () => {
		setFetchResponse({
			ok: false,
			status: 500,
			json: async () => [],
		});

		await expect(getTodos()).rejects.toThrow("Failed to fetch todos");
	});

	it("getTodos throws when the data is not an array", async () => {
		setFetchResponse({
			ok: true,
			status: 200,
			json: async () => ({ message: "invalid" }),
		});

		await expect(getTodos()).rejects.toThrow("Invalid data format");
	});
});