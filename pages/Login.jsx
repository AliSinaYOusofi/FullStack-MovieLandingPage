import React, { useEffect, useRef } from 'react';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import "../font.css";
import * as Yup from "yup";
import gsap from 'gsap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useGloablData } from '../context/GlobalData';

const Login = () => {

    /*
        reducer function for setting for jwt
    */

    const [{}, dispatch] = useGloablData();

    /*
        refs for animating
    */
    let navigator = useNavigate();
    let headerRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let textRef = useRef();
    let buttonRef = useRef();
    let formRef = useRef();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(40, "not more than 40 characters")
                .min(0, "email can't be empty")
                .required("required").email("Invalid email"),
            password: Yup.string()
                .max(16, "not more than 16 characters")
                .min(8, "not less than 8 characters")
                .required("required") 
        }),
        onSubmit: values => {
            checkDatabaseForUser();
        }
    });

    // animating with gsap

    let counter = 0;

    useEffect( () => {
        const timeline = gsap.timeline();
        ++counter;

        if (counter === 1) {

            timeline.from(formRef, {
                x: 100,
                opacity: 0,
                ease: "bacl",
                
            }).from(headerRef, {
                x: 100,
                opacity: 0,
                ease: "back",
                
            }).from(emailRef, {
                x: 100,
                opacity: 0,
                ease: "back",
               
            }).from(passwordRef, {
                x: -100,
                opacity: 0,
                ease: "back",
               
            }).from(textRef, {
                x: 100,
                opacity: 0,
                ease: "back.in",
               
            }).from(buttonRef, {
                y:100,
                opacity: 0,
                ease: "back.in",
                
            });
        };
    }, [counter]);

    const checkDatabaseForUser = () => {
        axios.post("http://localhost:3001/login", 
                {   email: formik.values.email, 
                    password: formik.values.password
                }
        )
            .then( (response) => {
                console.log(response);
                
                if (response.data.message === 'success') {
                   
                    showToast("Login Success");

                    const {token} = response.data;
                   
                    sleep(4000).then(
                        () => { dispatch({type: "SET_TOKEN", token}); navigator("/watch")}
                    )
                } else if (response.data.message === "intruder") { // for user already in database
                    showToast("wrong password");
                } else if (response.data.message === "email not found") {
                    showToast("email not registered");
                }
            })
            .catch( (error) => {
                console.log("Failed To Login")
                toast("internsal server failure");
            })

    }
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const showToast = (what) => {
        if (what === "Login Success") {
            toast.success(what)
        } else if(toast === "wrong password") {
            toast.warning(what)
        } else {
            toast.error(what)
        }
    }


    const Notfications = () => {
        return (
          <div className="text-white">
              <ToastContainer 
                  pauseOnHover={false} 
                  closeOnClick={true}
                  progressStyle={{borderColor: "red"}}
                  autoClose={4000}
                  hideProgressBar={false}
                  draggable={true}
              />
          </div>
      );
    }

    return (
        <>
            <div className="w-screen h-screen parent flex flex-row items-center justify-center">
            
            <div className="text-white flex gap-y-10 form_container px-10 py-20 rounded">
                
                <form ref={el => formRef = el} onSubmit={formik.handleSubmit} className="flex-col items-center  justify-center">
                    <div className="flex gap-y-10 flex-col">
                        <div className="text-center text-xl text-[red] font-bold" ref={el => headerRef = el}> <h1>Login to Netflix</h1></div>
                        
                        <div className="lg:w-[25rem]">
                           
                            <input
                                ref={el => emailRef = el}
                                type="email"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email ?? ""}
                                className="w-full outline-none border-none px-4 py-2 rounded-sm  text-center text-black placeholder:text-gray-800"
                                placeholder="email"
                            />
                            <p className="text-[red]"> 
                                {formik.touched.username && formik.errors.username 
                                ?   formik.errors.username
                                :   null
                                }
                            </p>
                        </div>
                        <div className="lg:w-[25rem]">

                            <input
                                ref={el => passwordRef = el}
                                type="password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password ?? ""}
                                className="w-full outline-none border-none px-4 py-2 rounded-sm placeholder:text-gray-800 text-black text-center"
                                placeholder="p"
                            />
                            <p className="text-[red] clamp"> 
                                {formik.touched.password && formik.errors.password 
                                ?   formik.errors.password
                                :   null
                                }
                            </p>
                            <div className="flex justify-between">
                                <Link to="/signup" className="transition-all duration-700 hover:underline">
                                    SingUp
                                </Link>
                                <Link to="/" className="transition-all duration-700 hover:underline">
                                    <p> HomePage </p>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button ref={el => buttonRef = el} type="submit" className=" text-center bg-red-600 w-full px-3 py-2 rounded-md transition-all duration-200 hover:bg-red-800 hover:-translate-y-1"> Login</button>
                        </div>
                     </div>
                    </form>
                </div>
            </div>
            <Notfications />
        </>
    );
}

export default Login;
