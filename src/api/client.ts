// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Fetch won't handle client response errors so I borrowed a small wrap from
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
 */
export const BASE_URL = "http://localhost:8080/todos";
const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";

export const client = async (endpoint: string, {body, method} = {}) => {
    const headers = {"Content-Type": "application/json"};
    const config = {
        method: method,
        headers: {
            ...headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    try{
        const response = await window.fetch(endpoint, config);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {

            return await response.json();
        }

        return;
    } catch (e) {

        return Promise.reject(e.message);
    }
};

client.get = (endpoint) => {

    return client(endpoint, { method: GET });
};

client.post = (endpoint, body = {}) => {

    return client(endpoint, { body, method: POST });
};

client.delete = (endpoint) => {

    return client(endpoint, { method: DELETE });
};