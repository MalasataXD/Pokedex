import {useEffect, useState} from "react";

export default function PokemonList({pokemon})
{
    // Used for getting information about the different Pokémon based on their name.
    async function getPokemonInfo(pokemon) {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
        if (!response.ok) {
            throw new Error(`Could not get information for ${pokemon}`)
        }

        const data = await response.json();
        var pokemonData = {
            name: data.name,
            id: data.id,
            types: data.types.map(type => type.type.name),
            image: data.sprites.other["official-artwork"].front_default
        };
        return pokemonData;
    }

    // Used to make the individual cards for each Pokémon
    function Card({ pokemon }) {
        const [pokemonInfo, setPokemonInfo] = useState(null);

        useEffect(() => {
            async function getPokemonInfo(pokemon) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                if (!response.ok) {
                    throw new Error(`Could not get information for ${pokemon}`);
                }
                const data = await response.json(); // * Convert to JSON.
                // * Create Pokemon object with information
                const pokemonObj = {
                    name: data.name,
                    id: data.id,
                    types: data.types.map(type => type.type.name),
                    image: data.sprites.other['official-artwork'].front_default,
                };
                setPokemonInfo(pokemonObj);
            }
            getPokemonInfo(pokemon);
        }, [pokemon]);

        return (
            <div className="card">
                {pokemonInfo ? (
                    <>
                        <div className="name">{pokemonInfo.name}</div>
                        <div>
                            <img width="96" height="96" src={pokemonInfo.image} alt={pokemonInfo.name} />
                        </div>
                        <div className="types">
                            {pokemonInfo.types.map(type => (
                                <div key={type} className={`type ${type}`}>
                                    {type}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    }

    return (
        <div class="container">
            {pokemon.map(poke => (<div key={poke}><Card pokemon={poke}/></div>))}
        </div>
    )
}
