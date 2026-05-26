import Navbar from "../Navbar";
import GamesContextProvider from "../../context/GamesContext";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { Outlet } from "react-router-dom";

    // password: progettoMio

export default function Layout() {
   
    const mainData = useLoaderData()
   

    
   

    return (<>


            <GamesContextProvider mainData={mainData}>

                <Navbar />

            
                    <Outlet />
            </GamesContextProvider>


 

    </>)
}