import { useContext  } from "react";
import { GamesContext } from "../context/GamesContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router";
import { supabase } from "../database/supabase";
import { useForm } from "react-hook-form";
import BodyDetail from "../components/DetailDescription";
import ReviewsList from "../components/ReviewsList";

export default function Detail() {
    const { id } = useParams();
    const { games } = useContext(GamesContext);


    const game = games.find((el) => el.id.toString() === id);



    return (
        <>
            <div className="mt-50 flex-col  m-auto w-full text-amber-50">
                

            <h1 className="text-center text-3xl mb-3 ">{game.name}</h1>
            <div className="flex md:flex-row flex-col gap-5 p-5 w-fit m-auto" >
                {/* IMAGE */}
                <div className="md:h-96 md:w-96 h-full w-full my-5 ">
                    <img
                        className="w-full h-full object-cover overflow-hidden rounded-2xl border-2 border-gray-400"
                        src={game.background_image}
                        alt=""
                    />
                </div>
                <div>
                    <BodyDetail game={game} />
                </div>
          
            </div>
           
            </div>
            <ReviewsList game={game} />

            
    
        </>
    );
}