import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signUp } = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const onSubmit = async (dataReg) => {

        if (dataReg.password !== dataReg.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const fail = await signUp({
            email: dataReg.email,
            password: dataReg.password,
            options: {
                data: {
                    first_name: dataReg.firstName,
                    last_name: dataReg.lastName,
                    username: dataReg.username
                }
            }
        })

        if (fail) {
            if (message) {
                return;
            } else {
                setMessage(fail);
            }
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center px-4 py-10">

            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md sm:max-w-lg flex flex-col text-amber-50 bg-black/20 p-6 sm:p-10 rounded-2xl mt-50">
                <h1 className="text-center text-3xl sm:text-4xl mb-2">
                    Register
                </h1>

                {message && (
                    <h2 className="text-center text-red-500 mb-3 text-sm sm:text-base">
                        {message}
                    </h2>
                )}

                {/* USERNAME */}
                <label className="mt-4" htmlFor="username">UserName</label>
                <input
                    {...register("username", {
                        required: "this field is required!",
                        minLength: { value: 3, message: "Minimum length is 3" },
                        maxLength: { value: 50, message: "Maximum length is 50" }
                    })}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="username"
                    type="text"
                />
                {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}

                {/* FIRST NAME */}
                <label className="mt-4" htmlFor="firstName">First Name</label>
                <input
                    {...register("firstName")}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="firstName"
                    type="text"
                />

                {/* LAST NAME */}
                <label className="mt-4" htmlFor="lastName">Last Name</label>
                <input
                    {...register("lastName")}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="lastName"
                    type="text"
                />

                {/* EMAIL */}
                <label className="mt-4" htmlFor="email">Email</label>
                <input
                    {...register("email", {
                        required: "this field is required!",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email format"
                        }
                    })}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="email"
                    type="email"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                {/* PASSWORD */}
                <label className="mt-4" htmlFor="password">Password</label>
                <input
                    {...register("password", {
                        required: "this field is required!",
                        minLength: { value: 3, message: "Minimum length is 3" }
                    })}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="password"
                    type="password"
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                {/* CONFIRM PASSWORD */}
                <label className="mt-4" htmlFor="confirmPassword">Confirm Password</label>
                <input
                    {...register("confirmPassword", {
                        required: "this field is required!",
                        minLength: { value: 3, message: "Minimum length is 3" }
                    })}
                    className="bg-blue-50 text-black border border-gray-600 p-2 rounded-2xl w-full"
                    id="confirmPassword"
                    type="password"
                />
                {errors.confirmPassword && (
                    <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-2xl w-full sm:w-auto mx-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Register