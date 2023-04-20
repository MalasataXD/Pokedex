import '../App.css';
import {useEffect, useState} from "react";

import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";

export default function PokeDex()
{
    // # The list of Pokémon
    const [pokemon, setPokemon] = useState();
    // # Used for keeping track on which "page" of Pokémon, you are on
    const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    // # Used for keeping track on the next 20 Pokémon
    const [nextPageUrl,setNextPageUrl] = useState();
    // # Used to keep track on the prev. 20 Pokémon
    const [prevPageUrl,setPrevPageUrl] = useState();
    // ! LOADING STATE
    const [loading,setLoadingState] = useState(true);

    // * Get the Pokémon names from the API.
    async function fetchPokemon()
    {
        try {
            setLoadingState(true);
            const response = await fetch(currentPageUrl);
            if (!response.ok) {
                throw new Error("Response was NOT OK!");
            }
            const data = await response.json();
            setNextPageUrl(data.next); // # Take the "next" value of the request
            setPrevPageUrl(data.previous); // # Take the "previous" value of the request
            setPokemon(data.results.map((p) => p.name)); // ¤ Update the list of Pokémon!
            setLoadingState(false);
        } catch (error) {
            console.log("Something went wrong")
        }
    }

    // ¤ Dynamic update the list of shown Pokémon upon change.
    useEffect(() =>
    {
        fetchPokemon()
    }, [currentPageUrl]);

    // * Go to the next page of Pokémon.
    function goToNextPage()
    {
        setCurrentPageUrl(nextPageUrl);
    }

    // * Go to the prev. page of Pokémon.
    function goToPrevPage()
    {
        setCurrentPageUrl(prevPageUrl);
    }

    if(loading) return "Loading...";


    return (
        <>
            <div className="header">
                POKEDEX
            </div>
            <div className="cards">
                <PokemonList pokemon={pokemon}/>
            </div>
            <div className="controls">
                <Pagination goNext={nextPageUrl ? goToNextPage : null} goPrev={prevPageUrl ? goToPrevPage : null}/>
            </div>
        </>
    )
}
