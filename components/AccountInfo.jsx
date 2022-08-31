import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { RightCircleOutlined } from "@ant-design/icons"
import "../font.css";
import {useFormik} from 'formik';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {FaFileUpload} from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import {useGloablData} from "../context/GlobalData";
import { useNavigate } from 'react-router-dom';


const AccountInfo = () => {
    
    const [rotate, setRotate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [{ current_token}, dispatch] = useGloablData();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userTime, setUserTime] = useState();
    const [deleteComp, setDelete] = useState(false);

    
    let infoRef = useRef(); 
    let updateRef = useRef(); 
    let arrowRef = useRef();
    let deleteRef = useRef();

    // this part should be more backend than frontend
    // lik updating user account details and delteing

    useEffect( () => {
        gsap.to(infoRef, {
            x: 1100,
            opacity: 1,
            zIndex: 9999,
            ease: "elastic",
            duration: 0.3
        });
        gsap.to(updateRef, {
            x: 1100,
            opacity: 1,
            zIndex: 9999,
            ease: "elastic",
            duration: 0.4
        });
    }, []);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.post("http://localhost:3001/details", { token: current_token});
                let {user_name, user_email, create_at} = response.data;
                setUserEmail(user_email); setUserName(user_name); setUserTime(create_at);
            } catch(error) { console.log(error)}
        }
        getUserDetails();
    }, [current_token])

    const rotateIt = () => {
       
        rotate ? arrowRef.current.style.rotate = "180deg" :  arrowRef.current.style.rotate = "0deg"

        !rotate ?
        gsap.to(infoRef, {
            x: 0,
            opacity: 1,
            zIndex: 9999,
            ease: "back.in",
            duration: 0.3
        }) :
        gsap.to(infoRef, {
            x: 1100,
            opacity: 1,
            zIndex: 9999,
            ease: "back.in",
            duration: 0.3
        })
        setRotate(!rotate);
    }

    const formik = useFormik({
        
        initialValues: {
            username: '',
            password: 'helloWorld'
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(40, "not more than 40 characters")
                .min(0, "username can't be empty")
                .required("required"),
            password: Yup.string()
                .max(16, "not more than 16 characters")
                .min(8, "not less than 8 characters")
                .required("required")
                
        }),
        onSubmit: values => {
           verifyUserAndUpdateDetails();
        }
    });


    const displayUpdateForm = () => {
        setUpdate(!update);

        update 
        ? gsap.to(updateRef, {
            x: 1100,
            opacity: 1,
            zIndex: 9999,
            ease: "back.in",
            duration: 0.3,
            stagger: 0.5
        })
        :  gsap.to(updateRef, {
            x: 0,
            opacity: 1,
            zIndex: 9999,
            ease: "elastic",
            duration: 0.3
        })
    };

    const closeUpdateForm = () => {
        setUpdate(!update);
        gsap.to(updateRef, {
            x: 1100,
            opacity: 1,
            zIndex: 9999,
            ease: "elastic",
            duration: 0.3
        });
    }

    const verifyUserAndUpdateDetails = async () => {
        try {
            const response = await axios.post("http://localhost:3001/authenticate",
            {token: current_token, new_username: formik.values.username, new_password: formik.values.password} );
            
            (response.data.message === "done") ? showToast("You details updated") : showToast("Internal Server Errro");

        }catch(error) { console.log(error)}
    }

    const showToast = (what) => { what === "1 Movie was added" ? toast.success(what) : toast.warning(what) }

    const deleteToast = (part) => { part === "Account successfully deleted" ? toast.success(part): toast.error(part)}

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

    const showDelete = () => {

        setDelete(!deleteComp);
        !deleteComp ? gsap.to(deleteRef, {
            x:0,
            duration: 0.5,
            ease: "ease",
            stagger: 0.4
        }) : gsap.to(deleteRef, {
            x:-1340,
            duration: 0.5,
            ease: "ease",
            stagger: 0.4,
            display: "hidden"
        })
    }

    useEffect( () => {
        gsap.to(deleteRef, {
            x:-1340,
            duration: 0.5,
            ease: "ease",
            stagger: 0.4,
            display: "hidden"
        });
    }, []);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let navigator = useNavigate();
    const deleteMe = async () => {
        try {
            const response = await axios.post("http://localhost:3001/deleteme", {email: userEmail});
            // if user got deleted we can show our toas based on response of the server
            console.log(response.data);
            if (response.data.message === "done") deleteToast("Account successfully deleted");
            else deleteToast("Failed To Delete You Account");

            sleep(4000).then(
                () => { dispatch({type: "SET_TOKEN", token : null}); navigator("/")}
            );
        }catch(error) { console.log(error); }
    }

    const hideDelete = () => {
        setDelete(!deleteComp)
        gsap.to(deleteRef, {
            x:-1340,
            duration: 0.5,
            ease: "ease",
            stagger: 0.4,
            display: "hidden"
        });
    };
    
    return (
        <div className="notfiy">
        
          <div id="first" ref={el => infoRef = el} className="w-full lg:w-[80%] lg:left-[8%] flex items-center justify-center  absolute lg:top-[10%] top-[15%]">
            <div className="bg-[#ff0606] w-[95%] lg:w-2/3 container rounded-md outline-none flex px-2 lg:px-6 lg:py-10 text-white py-2 gap-x-3 items-center text-sm lg:text-[1.3rem]">
                <div className="flex items-center">
                    <img className="rounded-full w-[4rem] lg:w-[7rem]" src="https://img.freepik.com/free-vector/young-man-classroom-character-scene_24877-57854.jpg?w=740&t=st=1661423844~exp=1661424444~hmac=eb1cc562082d08e06e6adf266877cf464d36535e8d238f1a5c4f5c744e92d7ed" alt="profile" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <p> Name: {userName}</p>
                    <p> Email: {userEmail}</p>
                    <p> Created At: {userTime}</p>
                </div>
                <div className="flex  flex-col gap-y-[0.1rem] ml-3 lg:ml-10 lg:gap-y-2">
                    <h1 className=""> Manage Account </h1>
                    <button className="transition-all duration-200 hover:scale-105 rounded-md py-1   lg:px-10 text-[green]" onClick={displayUpdateForm}> Update </button>
                    <button className="transition-all duration-200 hover:scale-105 rounded-md py-1  lg:px-10 text-[red]" onClick={showDelete}> Delete </button>
                </div>
            </div>
          </div>
          <div className="rounded-full bg-white text-black p-2 w-fit 
            flex items-center text-3xl cursor-pointer absolute top-[90%] -left-3 transition-all 
            duration-300 hover:left-0">
            <RightCircleOutlined onClick={rotateIt} ref={arrowRef} className="transition-all duration-200"/>
          </div>


          <div ref={el => updateRef = el} className="w-full lg:w-[80%] lg:left-[8%] flex items-center justify-center  absolute lg:top-[63%] top-[51%]">
                <div className=" w-[95%] lg:w-2/3 container rounded- rounded-md outline-none flex px-2 lg:px-6 lg:py-10 text-white py-2 gap-x-3 items-center text-sm lg:text-[1.3rem]">
                    <form className="flex items-center gap-x-2" onSubmit={formik.handleSubmit}>

                        <div className="flex items-center rounded-full text-center">
                            <label  className="py-3  rounded-md w-[5rem] cursor-pointer text-[1rem] text-center lg:w-[7rem] bg-gray-600  text-white" htmlFor='ease'>
                            
                                <input
                                    className="hidden"
                                    type="file"
                                    id="ease"
                                />
                            <span className="px-2 flex items-center justify-center">  <FaFileUpload className="text-3xl text-white" /> </span> +upload
                            </label>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            
                            <div>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username ?? ""}
                                    className="w-full outline-none border-none px-2 py-1 rounded-sm  text-center text-black placeholder:text-gray-800"
                                    placeholder="new username"
                                />
                                <p className="text-[red]"> 
                                    {formik.touched.username && formik.errors.username 
                                    ?   formik.errors.username
                                    :   null
                                    }
                                </p>
                            </div>

                            <div>
                                <input       
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={formik.handleChange}
                                    className="w-full outline-none border-none px-2 py-1  rounded-sm placeholder:text-gray-800 text-black text-center"
                                    placeholder="new password"
                                />
                                <p className="text-[red] clamp"> 
                                    {formik.touched.password && formik.errors.password 
                                    ?   formik.errors.password
                                    :   null
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col ml-3 lg:ml-10  gap-y-1 mb-4">
                            <h1 className=""> Actions </h1>
                            <button type="submit" className="transition-all duration-200 hover:scale-105 rounded-md py-1  lg:px-10 px-1 text-[green]"> Save </button>
                            <button type="button" className="transition-all duration-200 hover:scale-105 rounded-md py-1 text-center  lg:px-10 px-1 text-[red]" onClick={closeUpdateForm}> Cancel </button>
                        </div>
                    </form>
                </div>
          </div>
          <div ref={el => deleteRef = el} className="notfiy absolute hell top-[35%] lg:top-[47%] left-[23%] w-full h-[10rem]">
            <div  className=" w-1/2 h-[5rem]  text-white rounded-md  gap-y-2 items-center love flex flex-col justify-center">
                    <div>
                        <h1>
                            Are you sure?
                        </h1>
                    </div>
                    <div>
                        <button onClick={deleteMe} className="text-[red] px-4 py-1 rounded-md transition-all duration-200 hover:bg-[red] hover:text-black"> Delete </button>
                        <button className="text-[green] px-4 py-1 transition-all rounded-md duration-200 hover:bg-[green] hover:text-white" onClick={hideDelete}> Cancel </button>
                    </div>
                </div>   
          </div>
          <Notfications />
        </div>
    );
}

export default AccountInfo;