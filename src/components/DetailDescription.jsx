import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { supabase } from "../database/supabase";

export default function BodyDetail({game}){

    const [isFavourite, setIsFavourite] = useState(false);
   
    const { profile } = useContext(UserContext);

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();



    const addReview = async (review) => {
                const {data, error}= await supabase
                .from("Reviews")
                .insert([
                    {profile_id: profile.id, game_id: game.id, game_name: game.name, description: review.description}
                ])
                .eq("game_id", game.id);
       
                    
        reset();
    };


    const getFavourite = async () => {
        const { data, error } = await supabase
            .from("favourite table")
            .select()
            .eq("profile_id", profile.id)
            .eq("game_id", game.id);

        if (error) {
            console.log(error);
            return;
        }

        setIsFavourite(data.length > 0);
    };

    useEffect(() => {
        getFavourite();
        
    }, []);

    const addFavourite = async () => {
        await supabase
            .from("favourite table")
            .insert([
                {
                    profile_id: profile.id,
                    game_id: game.id,
                    game_name: game.name,
                },
            ]);

        setIsFavourite(true);
    };

    const removeFavourite = async () => {
        await supabase
            .from("favourite table")
            .delete()
            .eq("profile_id", profile.id)
            .eq("game_id", game.id);

        setIsFavourite(false);
    };

    
    


    const handleFavourites = async () => {
        if (!isFavourite) {
            await addFavourite();
        } else {
            await removeFavourite();
        }
    };
    


    return (<>
    
              {/* DETAILS */}
                <div className="md:h-96 md:w-96 h-full w-full my-5 border-2 border-gray-400 p-5 NavBg rounded-2xl">
                    {/* ADD FAVOURITES */}
                    <div className="flex items-center">
                        <p>Add to Favourites</p>

                        <button
                            className="text-3xl bg-white rounded-full border-2 border-amber-200 m-5"
                            onClick={handleFavourites}
                        >
                            {isFavourite ? (
                                <i className="fa-solid fa-heart text-red-600"></i>
                            ) : (
                                <i className="fa-regular fa-heart text-red-600"></i>
                            )}
                        </button>
                    </div>

                    {/* REVIEW FORM */}
                   
                        <p>Add review</p>

                        <form className="flex flex-col text-black" onSubmit={handleSubmit(addReview)}>
                            <textarea className="bg-amber-50"  {...register("description", {required: true, maxLength: 100, })} placeholder="Max 100 characters..." />


                            {errors.review?.type === "maxLength" && (
                                <p style={{ color: "red" }}>
                                    Max 100 characters allowed
                                </p>
                            )}

                            <button type="submit" className="rounded-2xl my-5 bg-amber-300 w-fit m-auto p-3 px-5 border-amber-50 border-2">
                                Submit
                            </button>
                        </form>
                 
                </div>

                 
    </>)
    
}