import { GamesContext } from "../context/GamesContext";
import { useContext, useState, useEffect } from "react";


export default function Header() {

    const {games} = useContext(GamesContext)

    const [randomImg, setRandomImg] = useState(null);
    const allowedIndexes = [0, 1, 2, 4, 5];
    const randomIndex = allowedIndexes[Math.floor(Math.random() * allowedIndexes.length)];

    const getImage = games[randomIndex];

        useEffect(()=>{
        setRandomImg(getImage)
    }, [])

    return (<>

        <header className="h-96 mt-24">
            
           
                <img className=" blur-x w-400 m-auto h-5/6 object-cover bg-center" src={randomImg?.background_image} alt="" />
            


        </header>

    </>)

}