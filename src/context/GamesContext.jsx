
import { createContext, useState, useEffect } from "react";

export const GamesContext = createContext(null)

export default function GamesContextProvider({children, mainData}){
   
    const [games, setGames] = useState(mainData)
        const [category, setCategory] = useState("All")
    const [input, setInput] = useState("")

      useEffect(() => {
    setGames(mainData);
  }, [mainData]);

    return (

        <GamesContext.Provider value={{games, setGames, category, setCategory, input, setInput}}>
            {children}
        </GamesContext.Provider>

    )
}