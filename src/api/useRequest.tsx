// export const FETCHER = (url: string) => fetch(url).then(res => res.json());
export const BASE_URL = "http://localhost:8080/todos";

// export function useTasks() {
//     const { data, error } = useSWR(BASE_URL, FETCHER);
//
//     return {
//         tasks: data,
//         isError: error
//     };
// }