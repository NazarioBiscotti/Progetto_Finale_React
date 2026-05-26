import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";

import { UserContext } from "../context/UserContext";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (dataLog) => {
        const fail = await login({
            email: dataLog.email,
            password: dataLog.password
        });

        if (fail) {
            setMessage(fail);
        } else {
            navigate("/");
        }
    };

    return (
        <div className=" h-screen flex items-center justify-center px-4">
            <div className="h-fit max-w-md bg-black/20 p-6 md:p-10 rounded-2xl">

                <h1 className="text-center text-3xl md:text-4xl text-amber-50 mb-2">
                    Login
                </h1>

                {message && (
                    <h2 className="text-center text-red-500 mb-4">
                        {message}
                    </h2>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                    {/* EMAIL */}
                    <div>
                        <label className="text-amber-50" htmlFor="email">
                            Email
                        </label>

                        <input {...register("email", {
                                required: "This field is required!",
                                minLength: { value: 3, message: "Minimum length is 3" },
                                maxLength: { value: 50, message: "Maximum length is 50" }
                            })}
                            id="email"
                            type="email"
                            className="w-full bg-blue-50 border border-gray-600 p-2 rounded-2xl mt-1"
                        />

                        {errors.email && (
                            <p className="mt-1 text-red-600 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-amber-50" htmlFor="password">
                            Password
                        </label>

                        <input
                            {...register("password", {
                                required: "This field is required!",
                                minLength: { value: 3, message: "Minimum length is 3" },
                                maxLength: { value: 50, message: "Maximum length is 50" }
                            })} id="password"  type="password" className="w-full bg-blue-50 border border-gray-600 p-2 rounded-2xl mt-1"
                        />

                        {errors.password && (
                            <p className="mt-1 text-red-600 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-3xl mt-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}