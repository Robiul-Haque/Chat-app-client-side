import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { emailPassSignIn, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signIn = data => {
        setError("");

        emailPassSignIn(data.email, data.password)
            .then(userCredential => {
                const loginUser = userCredential;
                if (loginUser.user?.email === data.email) {
                    navigate("/");
                }
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
            })
    }

    const signInWithGoogle = () => {
        setError("");

        googleSignIn()
            .then(result => {
                console.log(result);
                if (result.providerId === "google.com" && result._tokenResponse?.email) {
                    navigate("/");
                }
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(data => signIn(data))} className="card-body">
                    <h1 className="text-2xl text-center font-semibold mb-2">Sign-in</h1>
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
                            <a href="sign-up" className="label-text-alt link link-hover">Don,t have an account sign-up</a>
                        </label>
                    </div>
                    {
                        error && <p className=" flex justify-center gap-x-2 text-red-500 text-center text-xs"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {error}</p>
                    }
                    <button className="btn btn-primary mt-3">Sign-in</button>
                </form>
                <button onClick={signInWithGoogle} className="btn btn-primary flex justify-center mx-8 mb-8">
                    <img width="25" height="25" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                    Sign-in With Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;