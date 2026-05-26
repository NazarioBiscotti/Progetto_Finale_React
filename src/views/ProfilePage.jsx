import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { GamesContext } from "../context/GamesContext";
import { Link } from "react-router";
import { supabase } from "../database/supabase";

export default function ProfilePage() {

    const { user, profile, updateAvatar, pUrl } = useContext(UserContext)
    const { games } = useContext(GamesContext)
    const [userFavourites, setUserFavourites] = useState([])
    const [gameCard, setGameCard] = useState([]);

    const getFavourites = async () => {

        if (!profile) return;

        const { data: favourites, error } = await supabase
            .from("favourite table")
            .select("*")
            .eq("profile_id", profile.id);

        if (error) {
            console.log(error);
            return;
        }

        const fav = favourites || []
        setUserFavourites(fav)

        const getCard = games.filter(game =>
            favourites.some(fav =>
                game.name.trim().toLowerCase() ===
                fav.game_name.trim().toLowerCase()
            )
        );

        setGameCard(getCard)
    };

    useEffect(() => {
        getFavourites()
    }, [])

    async function change(e) {
        const image = e.target.files[0];
        const filePath = `${user.id}-avatar.png`;
        updateAvatar(image, filePath)
    }

    return (
        <>

            <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col items-center mt-50">


                {/* AVATAR */}
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-green-500 mx-auto">

                    {pUrl && (
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={pUrl ? `${pUrl}?t=${Date.now()}` : ""}
                            alt="avatar"
                        />
                    )}

                    {/* UPLOAD */}
                    <div className="absolute bottom-0 right-0 flex justify-center bg-red-700 p-2 border-2 text-xl sm:text-2xl rounded-full">
                        <input onChange={change} className="hidden" type="file" id="avatar" />

                        <label htmlFor="avatar" className="cursor-pointer">
                            <i className="fa-solid fa-pencil"></i>
                        </label>
                    </div>
                </div>

                {/* USER INFO */}
                <div className="flex flex-col sm:flex-row justify-center items-center text-center text-lg sm:text-2xl text-amber-50 my-5 gap-2 sm:gap-5">
                    <p>{profile?.first_name}</p>
                    <p className="break-all">{user?.email}</p>
                    <p>{profile?.username}</p>
                </div>

                {/* EDIT PROFILE */}
                <button className="border-2 bg-blue-500 border-white p-3 rounded-2xl text-lg sm:text-2xl w-full sm:w-auto">
                    <Link to={"/profileSettings"}>Edit Profile</Link>
                </button>
            </div>

            {/* FAVOURITES */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center my-10 text-amber-50">

                <h2 className="text-xl sm:text-2xl my-5">FAVOURITES</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gameCard?.map((el) => (
                        <Link key={el.id} to={`/detail/${el.id}`}>
                            <div className="p-3 sm:p-5">

                                <p className="text-sm sm:text-base">{el.name}</p>

                                <div className="h-40 sm:h-48 border-amber-50 border-2 rounded-2xl overflow-hidden mt-3">
                                    <img className="w-full h-full object-cover" src={el.background_image} alt="" />
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </>
    )
}