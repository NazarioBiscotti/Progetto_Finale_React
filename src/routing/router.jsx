//* VIEWS
import routes from "./routes";
import Layout from "../components/Layouts/Layout";
import Homepage from "../views/Homepage";

import Detail from "../views/Detail";
import Login from "../views/Login";
import Register from "../views/Register";
import ProfilePage from "../views/ProfilePage";
import ProfileSetting from "../views/ProfileSetting";

//* DEPENDENCIES
import GamesContextProvider from "../context/GamesContext";
import { createBrowserRouter } from "react-router-dom";
import { GetAllLoaders } from "./loader";






const router = createBrowserRouter([

    {
        path: routes.home,
        Component: Layout,
        loader: GetAllLoaders,
        hydrateFallbackElement: <p>...loading</p> ,  
        children: [
            {
                index: true,
                Component: Homepage,
            },

            {
                path: "detail/:id",
                Component: Detail
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "profile",
                Component: ProfilePage
            },
            {
                path: "profileSettings",
                Component: ProfileSetting
            },
        ]
    }
])

export default router