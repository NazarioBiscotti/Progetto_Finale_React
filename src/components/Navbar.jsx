import { Link, useNavigate } from "react-router"
import { useContext, useState, useEffect } from "react"
import { supabase } from "../database/supabase";

// CONTEXTS
import { UserContext } from "../context/UserContext";
import { GamesContext } from "../context/GamesContext";


// COMPONENTS
import Dropdown from "./Dropdown"
import Filterbar from "./Layouts/Filterbar";
import Search from "./filters/Search";
import Categories from "./filters/Categories";


export default function Navbar() {


    const { user, profile, pUrl, setPUrl } = useContext(UserContext)

    const navigate = useNavigate()


    return (
        <>
            <nav className="NavBg fixed isolate left-0 right-0 top-0 h-24 flex w-full z-10 border-emerald-600 border-2 items-center justify-between px-5">


                {/* LINKS  */}


                <div className="h-16 md:h-24">

                    <Link to={"/"}>
                        <img className="block md:hidden h-full object-cover" src="/logoMezzo.png" alt="" />

                        <img className="hidden md:block h-full object-cover" src="/logoReactor.png" alt="" />
                    </Link>
                </div>


                <div className="text-amber-50  md:text-2xl">LINK VARI E EVENTUALI</div>

                {/* USER */}

                <div>

                    <Dropdown />

                </div>


            </nav>
        </>
    )
}



