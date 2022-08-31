import React, { useEffect, useRef } from 'react';
import {useFormik} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import "../font.css";
import * as Yup from "yup";
import gsap, { Back } from 'gsap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

    let navigator = useNavigate();
    let headerRef = useRef();
    let firstNameRef = useRef();
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
                .required("required"),
            firstName: Yup.string()
                .max(20, 'not more than 20 chars')
                .min(4, 'not less than 4 chars')
                .required("required")
                
        }),
        onSubmit: () => {
          
            registerUser()
        }
    });


    let counter = 0;

    useEffect( () => {
        
        const timeline = gsap.timeline();
        ++counter;
        
        if (counter === 1) {

            timeline.from(formRef, {
                y: -100,
                opacity: 0,
                ease: "back.in",
              
            }).from(headerRef, {
                x: -100,
                opacity: 0,
                ease: "back.in",
              
            }).from(emailRef, {
                x: 100,
                opacity: 0,
                ease: "back.in",
            
            }).from(passwordRef, {
                x: -100,
                opacity: 0,
                ease: Back,
            
            }).from(textRef, {
                x: 100,
                opacity: 0,
                ease: "elastic",
            
            }).from(buttonRef, {
                y:100,
                opacity: 0,
                ease: "back.in",
            
            })
        }
    }, []);


    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const registerUser = () => {
        axios.post("http://localhost:3001/register", 
                {   firstName: formik.values.firstName, 
                    email: formik.values.email, 
                    password: formik.values.password
                }
        ).then( (response) => {
                // show success message
                console.log(response.data);

                if (String(response.data.message) === 'success') {
                    
                    showToast("Registeration Sucess");

                    sleep(4000).then(
                        () => navigator("/login")
                    );
                } else {
                    showToast(formik.values.email + " Already registered");
                    
                }
            })
            .catch( (error) => {
                showToast("Registeration Faild in Server")
            });
    }

    // showing notification using react-toast

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
    
    
    const showToast = (what) => {
        if (what === "Registeration Sucess") {
            toast.success(what)
        } else if(toast === (formik.values.email + " Already registered")) {
            toast.warning(what)
        } else {
            toast.error(what)
        }
    }
    return (
        <>
            <div className="overflow-hidden w-screen h-screen parent flex flex-row items-center justify-center">
            
            <div className="text-white flex gap-y-10 form_container px-10 py-10 rounded">
                
                <form  ref={el => formRef = el} onSubmit={(event) => {event.preventDefault(); formik.handleSubmit()}} className="flex-col items-center  justify-center">
                    <div className="flex gap-y-10 flex-col">
                        <div className="text-center text-xl text-[red]"> <h1>Create Account On Netflix</h1></div>
                        
                        
                        <div className="lg:w-[25rem]">

                            <input
                                ref={el => firstNameRef = el}
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName ?? ""}
                                className="w-full outline-none border-none px-4 py-2 rounded-sm  text-center text-black placeholder:text-gray-800"
                                placeholder="firstName"
                            />
                            <p className="text-[red]"> 
                                {formik.touched.firstName && formik.errors.firstName 
                                    ? formik.errors.firstName 
                                    : null
                                }
                            </p>
                        </div>

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
                                {formik.touched.email && formik.errors.email 
                                    ? formik.errors.email
                                    : null
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
                                placeholder="password"
                            />
                            <p className="text-[red] clamp"> 
                                {formik.touched.password && formik.errors.password 
                                ? formik.errors.password
                                : null
                                }
                            </p>
                            <div className="flex justify-between" ref={el => textRef = el}>
                                <Link to="/login" className="transition-all duration-700 hover:underline">
                                    Sign In
                                </Link>
                                <Link to="/" className="transition-all duration-700 hover:underline">
                                    <p> Home </p>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button  ref={el => buttonRef = el} type="submit" className=" text-center bg-red-600 w-full px-3 py-2 rounded-md transition-all duration-200 hover:bg-red-800 hover:-translate-y-1"> SignUp</button>
                        </div>
                        
                    </div>
                 </form>
                </div>
            </div>
            <Notfications />
        </>
    );
}

export default SignUp;
