import { useContext, useState, useEffect } from "react"
import { Link } from "react-router"
import { GamesContext } from "../../context/GamesContext"
import Card from "../Card"
import Filterbar from "./Filterbar"
import Search from "../filters/Search"
import Categories from "../filters/Categories"




export default function CardWrapper() {
    
    const { games, category, input, setCategory, setInput } = useContext(GamesContext)





    function renderGames() {
        let filteredGames = games || []

        if (category !== "All") {

            filteredGames = filteredGames.filter((el) =>
                el.genres?.some((genre) => genre.name === category)
            )

        }

        if (input !== "") {
            filteredGames = filteredGames.filter((el) => el.name?.toLowerCase().includes(input.toLowerCase()))
        }

        return filteredGames.map((el) => (
            <Link key={el.id} to={`/detail/${el.id}`}>
            <Card  game={el} />
            </Link>
        ))


    }

    return (<>
        <div className="flex flex-col w-full m-auto" >

        
                 <Filterbar>
                                <Categories setCategory={setCategory} />
                                <Search setInput={setInput} />
                            </Filterbar>
            <div className="m-auto gap-10  grid md:grid-cols-3 grid-col-1">

                {renderGames()}
            </div>

        </div>
    </>)
}