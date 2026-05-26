import { useState, useEffect } from "react";
import { supabase } from "../database/supabase";

export default function ReviewsList({game}) {

    const [gameReview, setGameReviews] = useState();
    const getReviews = async () => {


        const { data: reviews, error } = await supabase
            .from("Reviews")
            .select("*")
            .eq("game_id", game.id);
        setGameReviews(reviews)
        console.log(reviews);

       
    };

    useEffect(() => {
        getReviews()

    }, [])


    return (<>

             <h2 className="text-center text-2xl  text-amber-50">REVIEWS</h2>
        
            <div className="  md:w-1/3 w-full  m-auto flex flex-wrap md:flex-row flex-col justify-center grid-cols-3 p-3 gap-5" >

            {gameReview.length > 0 ? (gameReview.map((el)=> 
            
            <div className="md:w-1/4 bg-gray-400 rounded-2xl w-full text-center border-2 border-gray-500 min-h-28 flex items-center p-5 justify-center "  key={el.id}>
               
                


                        <div className=" w-fit h-fit text-black0">

                        &ldquo;{el.description}&rdquo;
                        </div>
                       
                    </div>
              )) : (

                  <div  >
               
                


                        <div className=" w-fit h-fit m-auto ">

                       <h1 className="text-amber-50 m-auto">no reviews</h1>
                        </div>
                       
                    </div>
               )}
            </div>
    
        
    </>)

}