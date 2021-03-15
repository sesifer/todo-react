import React from "react";
import TodoList from "./components/TodoList";

//todo
//https://swr.vercel.app/docs/prefetching
//<link rel="preload" href="/api/data" as="fetch" crossorigin="anonymous">

function App():JSX.Element {

    return (
        <React.Fragment>
            <header>
               TODO LIST
            </header>
            <main>
                <TodoList/>
            </main>
            <footer>
                <p>©Copyright 2050 by nobody. All rights reversed. This was fun!</p>
            </footer>
        </React.Fragment>
    );
}

export default App;
