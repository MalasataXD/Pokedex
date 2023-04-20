import '../App.css';
import {Link, useParams} from "react-router-dom";
import DisplayStats from "../components/DisplayStats";

export default function PokeStats()
{
    const { name } = useParams()

    return (
        <>
            <div className="header">
                <Link to="/">
                    POKESTATS
                </Link>
            </div>
            <div className="cards">
                <DisplayStats pokemon={name}/>
            </div>
        </>
    )
}
