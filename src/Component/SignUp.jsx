/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useContext, useState, } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
// import { updateProfile } from "firebase/auth";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { emailPassSignUp, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUpWithCredential = data => {
        setError("");

        console.log(data.name, data.email, data.image[0], data.password);

        const formData = new FormData;
        formData.append('name', data.name);
        formData.append('image', data.image[0]);
        formData.append('email', data.email);
        formData.append('password', data.password);

        fetch('http://localhost:3000/user-profile-image', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

        // emailPassSignUp(data.name, data.email, data.password)
        //     .then(result => {
        //         const data = result;
        //         console.log(data);
        //         // updateProfile(data, name)
        //         if (data._tokenResponse?.email === data.email) {
        //             navigate("/");
        //         }
        //     })
        //     .catch(error => {
        //         setError(error.message);
        //         console.log(error);
        //     })
    }


    const signUpWithGoogle = () => {
        // setError("");

        googleSignIn()
            .then(result => {
                console.log(result);
                if (result.providerId === "google.com" && result._tokenResponse?.email) {
                    navigate("/");
                }
            })
            .catch(error => {
                // setError(error.message);
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(data => signUpWithCredential(data))} action="/user-profile-image" method="POST" encType="multipart/form-data" className="card-body">
                    <h1 className="text-2xl text-center font-semibold mb-2">Sign-up</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: "Name field is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters long"
                            },

                            maxLength: {
                                value: 30,
                                message: "Name must be almost 30 characters long"
                            },
                        })} placeholder="name" className={errors.name?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                        {
                            errors.name?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.name?.message}</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: "Email field is required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Email must be valid"
                            }
                        })} placeholder="email" className={errors.email?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                        {
                            errors.email?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.email?.message}</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" {...register("image", {
                            required: {
                                value: true,
                                message: "Profile image is required.",
                            },
                            validate: {
                                lessThan3MB: (image) => image[0]?.size < 3000000 || "Image size should not be greater than 3MB",
                                acceptedFormats: (image) =>
                                    ["image/jpeg", "image/png"].includes(image[0]?.type) ||
                                    "Only PNG, JPEG",
                            },
                        })} accept="image/png, image/jpeg" className={errors.image?.message ? "file-input file-input-bordered w-full max-w-xs border-red-500" : "file-input file-input-bordered w-full max-w-xs"} />
                        {
                            errors.image?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.image?.message}</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password field is required",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                message: "Password must contain 6 characters, one uppercase, one lowercase, one number, and one special character."
                            }
                        })} placeholder="password" className={errors.password?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                        {
                            errors.password?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.password?.message}</p>
                        }
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <label className="label">
                            <a href="sign-in" className="label-text-alt link link-hover">Have an account sign-in</a>
                        </label>
                    </div>
                    {
                        error && <p className=" flex justify-center gap-x-2 text-red-500 text-center text-xs"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {error}</p>
                    }
                    <button onClick={signUpWithCredential} className="btn btn-primary mt-4">Sign-up</button>
                </form >
                <button onClick={signUpWithGoogle} className="btn btn-primary mx-8 mb-8 mt-[-10px] flex justify-center" >
                    <img width="25" height="25" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                    Sign-up With Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;