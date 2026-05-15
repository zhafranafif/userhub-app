import type { IPost, ITodo, IUser, IUserData } from "@/lib/types";
import { getPosts, getTodos, getUserById, getUsers } from "./users.service";


export async function mapUserData(): Promise<IUserData[]> {
    const user = await getUsers();
    const posts = await getPosts();
    const todos = await getTodos();
    
    const userCompletedPosts = user.map((u: IUser) => {
        const userPosts = posts.filter((post: IPost) => post.userId === u.id);
        const userTodos = todos.filter((todo: ITodo) => todo.userId === u.id);

        const totalPosts = userPosts.length;
        const completedTodos = userTodos.filter((todo: ITodo) => todo.completed).length;
        const pendingTodos = userTodos.filter((todo: ITodo) => !todo.completed).length;
        
        return {
            ...u,
            totalPosts,
            completedTodos,
            pendingTodos
        };
    });

    return userCompletedPosts;
}

export async function mapSingleUserData(id: number): Promise<IUserData | null> {
    const user = await getUserById(id);

    if (!user) {
        return null;
    }

    const posts = await getPosts();
    const todos = await getTodos();

    const userPosts = posts.filter((post: IPost) => post.userId === user.id);
    const userTodos = todos.filter((todo: ITodo) => todo.userId === user.id);

    const totalPosts = userPosts.length;
    const completedTodos = userTodos.filter((todo: ITodo) => todo.completed).length;
    const pendingTodos = userTodos.filter((todo: ITodo) => !todo.completed).length;

    return {
        ...user,
        totalPosts,
        completedTodos,
        pendingTodos
    };
}