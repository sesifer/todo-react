// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
/**
 * Fetch won't handle client response errors so I borrowed a small wrap from
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
 */
export const BASE_URL = "http://localhost:8080/todos";
const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";

export const client = async (endpoint: string, {body, method, ...customConfig} = {}) => {
    const headers = {"Content-Type": "application/json"};
    const config = {
        method: method,
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    let data;
    try{
        // eslint-disable-next-line no-debugger

        const response = await window.fetch(endpoint, config);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        if (method === DELETE) {

            return "";
        }
       
        data = await response.json();
        return data;
    } catch (e) {

        return Promise.reject(e.message || data);
    }
};

client.get = (endpoint, customConfig = {}) => {

    return client(endpoint, { ...customConfig, method: GET });
};

client.post = (endpoint, body = {}, customConfig = {}) => {

    return client(endpoint, { ...customConfig, body, method: POST });
};

client.delete = (endpoint, customConfig = {}) => {

    return client(endpoint, { ...customConfig, method: DELETE });
};