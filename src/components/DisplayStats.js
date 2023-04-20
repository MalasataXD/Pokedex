import {useEffect, useState} from "react";

export default function DisplayStats({pokemon})
{
    const [pokeInfo, setPokeInfo] = useState(null);

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
                default_image: data.sprites.other['official-artwork'].front_default,
                shiny_image: data.sprites.other['official-artwork'].front_shiny,
                pixel_image: data.sprites.front_default,
                weight: data.weight,
                height: data.height,
                abilities: data.abilities
            }
            setPokeInfo(pokemonObj);
        }
        getPokemonInfo(pokemon);
    }, [pokemon]);

    return (
        <div className="container">
            {pokeInfo && (
                <>
                    <div className="column left-column">
                        <div className="display_img">
                            <div className="display_img_title">NORMAL</div>
                            <img src={pokeInfo.default_image} alt="Normal Sprite" />
                        </div>
                        <div className="display_img">
                            <div className="display_img_title">SHINY</div>
                            <img src={pokeInfo.shiny_image} alt="Shiny Sprite" />
                        </div>
                        <div className="display_img">
                            <div className="display_img_title">PIXEL ART</div>
                            <img src={pokeInfo.pixel_image} alt="Pixel Sprite" />
                        </div>
                    </div>
                    <div className="column right-column">
                        <div className="display_information">
                            <h1>{pokeInfo.name} #{pokeInfo.id}</h1>
                            <div className="types">
                                {pokeInfo.types.map(type => (
                                    <div key={type} className={`type ${type}`}>
                                        {type}
                                    </div>
                                ))}
                            </div>
                            <p><span>Weight:</span>  {pokeInfo.weight}</p>
                            <p><span>Height:</span>  {pokeInfo.height}</p>
                            <p><span>Ability:</span> {pokeInfo.abilities[0].ability.name}</p>
                            <p><span>Hidden Ability:</span> {pokeInfo.abilities[1].ability.name}</p>
                        </div>
                    </div>
                </>
                )}
        </div>
    )
}
