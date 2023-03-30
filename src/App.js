import './App.css';
import {useEffect, useState} from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

export default function App()
{
    // * The list of Pokémon
    const [pokemon, setPokemon] = useState();
    // * Used for keeping track on which "page" of Pokémon, you are on
    const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    // * Used for keeping track on the next 20 Pokémon
    const [nextPageUrl,setNextPageUrl] = useState();
    // * Used to keep track on the prev. 20 Pokémon
    const [prevPageUrl,setPrevPageUrl] = useState();

    // Get the Pokémon names from the API.
    async function fetchPokemon() {
        try {
            const response = await fetch(currentPageUrl);
            if (!response.ok) {
                throw new Error("Response was NOT OK!");
            }
            const data = await response.json();
            setNextPageUrl(data.next); // * Take the "next" value of the request
            setPrevPageUrl(data.previous); // * Take the "previous" value of the request
            setPokemon(data.results.map((p) => p.name)); // * Update the list of Pokémon!
        } catch (error) {
            console.log("Something went wrong")
        }
    }

    // Dynamic update the list of shown Pokémon upon change.
    useEffect(() =>
    {
        fetchPokemon()
    }, [currentPageUrl]);

    // Go to the next page of Pokémon.
    function goToNextPage()
    {
        setCurrentPageUrl(nextPageUrl);
    }

    // Go to the prev. page of Pokémon.
    function goToPrevPage()
    {
        setCurrentPageUrl(prevPageUrl);
    }

    return (
        <>
            <div class="header">
                POKEDEX
            </div>
            <div class="cards">
                <PokemonList pokemon={pokemon}/>
            </div>
            <div class="controls">
                <Pagination goNext={nextPageUrl? goToNextPage : null} goPrev={prevPageUrl? goToPrevPage : null}/>
            </div>
        </>
    )
}
