import './App.css';
import {

    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";

import PokeDex from "./routes/PokeDex";
import PokeStats from "./routes/PokeStats";

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route index element={<PokeDex/>}/>
        <Route path="stats/:name" element={<PokeStats/>}/>
    </Route>
))

export default function App()
{
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}
