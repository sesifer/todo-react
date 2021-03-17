export interface Todo {
    id: string
    text: string
    completed: boolean
    createdDate: number
    completedDate: number
}

export interface TodosState {
    todos: Todo[],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null,
}