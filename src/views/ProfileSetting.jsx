import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { data, useNavigate } from "react-router";
import { supabase } from "../database/supabase";



export default function ProfileSetting() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { updateProfile, profile } = useContext(UserContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)

    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (profile) {
            reset({
                username: profile.username,
                first_name: profile.first_name,
                last_name: profile.last_name,
            });
        }
    }, []);


    const onSubmit = async (dataUp, urlData) => {



        // console.log(dataUp);



        //! setUrl non lo puoi fare perchè urlData non fa in tempo a caricare


        updateProfile(dataUp);


        //  console.log(url);


        navigate("/profile")





    }


    return (

        <div className="w-full mt-50">

            <form onSubmit={handleSubmit(onSubmit)} className="w-200 m-auto flex flex-col text-amber-50" action="">
                <h1 className=" text-4xl text-center mb-5">update account</h1>
                <h2 className="text-center text-red-500">{message}</h2>
                <label className="mt-5" htmlFor="username">UserName</label>
                <input {...register("username", { required: "this field is required!", minLength: { value: 3, message: "Minimun length is 3" }, maxLength: { value: 50, message: "Maximum length is 50" } })} className="bg-blue-50 border border-gray-600 p-2 rounded-2xl" id="username" name="username" type="text" />
                {errors.username && <p className="mt-1 text-red-600">{errors.username.message}</p>}
                <label className="mt-5" htmlFor="first_name">First Name</label>
                <input {...register("first_name", { required: "this field is required!", minLength: { value: 3, message: "Minimun length is 3" }, maxLength: { value: 50, message: "Maximum length is 50" } })} className="bg-blue-50 border border-gray-600 p-2 rounded-2xl" id="first_name" name="first_name" type="text" />
                {errors.first_name && <p className="mt-1 text-red-600">{errors.first_name.message}</p>}

                <label className="mt-5" htmlFor="last_name">Last Name</label>
                <input {...register("last_name", { required: "this field is required!", minLength: { value: 3, message: "Minimun length is 3" }, maxLength: { value: 50, message: "Maximum length is 50" } })} className="bg-blue-50 border border-gray-600 p-2 rounded-2xl" id="last_name" name="last_name" type="text" />
                {errors.last_name && <p className="mt-1 text-red-600">{errors.last_name.message}</p>}




                <div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white mt-5 px-4 py-2 rounded-2xl w-100 m-auto"
                    >
                        Submit
                    </button>
                    <button onClick={() => navigate("/profile")} className="bg-blue-500 text-white mt-5 px-4 py-2 rounded-2xl w-100 m-auto"   >
                        Back
                    </button>
                </div>
            </form>

        </div>
    )

}