import { useState } from "react";

export default function Search({ setInput }) {



    function handleSearch(e) {
        const value = e.target.value
        setInput(value)
    }

    return (<>
        <div className="text-lg sm:text-2xl  sm:w-auto min-w-0">



            <input onChange={handleSearch} type="text" placeholder="Search game"
                className="border-2 bg-orange-400 text-black px-2 py-1 rounded-md w-full sm:w-64 max-w-full min-w-0" />




        </div>

    </>)
}