import type { IPost, ITodo, IUser } from "@/lib/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(): Promise<IUser[]> {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60, // Revalidate data every 60 seconds
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    
    if(!Array.isArray(data)) {
        throw new Error("Invalid data format");
    }
    return data as IUser[];
}

export async function getUserById(id: number): Promise<IUser> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(response.status === 404) {
        throw new Error(`User with id: ${id} not found`);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch user with id: ${id}`);
    }

    const data = await response.json();
    if (!data || typeof data !== "object") {
        throw new Error(`Invalid user data for id: ${id}`);
    }

    return data as IUser;
}

export async function getPosts(): Promise<IPost[]> {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    
    if(!Array.isArray(data)) {
        throw new Error("Invalid data format");
    }
    return data as IPost[];
}

export async function getTodos(): Promise<ITodo[]> {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    
    if(!Array.isArray(data)) {
        throw new Error("Invalid data format");
    }
    return data as ITodo[];
}