import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import "../font.css";
import background from '../images/large.jpg';
import {HomeOutlined, LoginOutlined, LogoutOutlined, PlayCircleOutlined,SearchOutlined, CloseCircleOutlined} from '@ant-design/icons'
import gsap, { Back } from 'gsap';
import SearchMovie from "../components/SearchMovie"

import {GiHamburgerMenu, GiCrossMark} from 'react-icons/gi'
import Footer from '../components/Footer';
import { useGloablData } from '../context/GlobalData';
import {RiAccountCircleLine} from 'react-icons/ri';

const Search = () => {
   
    const [{current_token}, ] = useGloablData();
    
    let menuRef = useRef();
    let header = useRef();
    let button = useRef();
    let burger = useRef();
    let searchBar = useRef();
    
    
    const [menu, setMenu] = useState(false);
   
   
    const [click, setClick] = useState(false);
    const [input, setInput] = useState();
    const [searchIcon, setSearchIcon] = useState(false);


    const handleMenu = () => {
        setMenu(!menu);
        if (!menu) {
            const timeline = gsap.timeline();
            timeline.to(menuRef, {
                x: 0,
                duration: 0.4,
                opacity: 90,
                zIndex: 100
            }).from(".ul li", {
               y: 100,
               duration: 0.6,
               opacity: 0,
               ease: "back.in",
               stagger: {
                   each: 0.3
               }
            })

        } else {
            gsap.to(menuRef, {
                x: 200,
                opacity: 0,
                duration: 0.3
            })
        }
    }


    let counter = 0;

    useEffect( () => {
        ++counter;
        gsap.to(menuRef, {
            x: 200,
            opacity: 10,
            ease: Back,
            duration: 1
        });
        if (counter === 1) {
            const timeline = gsap.timeline();

            timeline.from(header, {
                x: -200,
                opacity: 0,
                ease: Back
            }).from(burger, {
                x: 200,
                opacity: 0,
                ease: Back
            }).from(button, {
                x: 200,
                opacity: 0,
                ease: Back
            }).from(searchBar, {
                x: 200,
                opacity: 0,
                ease: Back
            })
        }
    }, [counter]);

    function emptyInput(events) {
        events.target.value = "";
        setInput("");
        searchBar.current.value = "";
    }
    const key = "6fab499c3bcdf2439b4e10623aeb3996";
    
    return (
        <div className="w-full h-full">
            <img 
          src={background} 
          alt=""
          className="object-cover w-full h-screen 
          " 
         />
        <div className="absolute top-0 left-0 bg-gradient-to-b from-black w-full h-full" />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-black/80 w-full h-full" />
            <div className="navbar  flex flex-row justify-between text-white w-full  absolute top-2">
                <div className="header">
                    <h1  className="text-[2rem] text-red-700 font-bold px-8 py-3 tracking-wider -mt-3" ref={el => header = el}>Netflix</h1>
                </div>
                <div  className="w-[10rem] mr-10 overflow-hidden  flex flex-col justify-end items-end">  
                    <div ref={el => burger = el} onClick={handleMenu} className="mt-4">
                        {
                            click ? <GiCrossMark className="text-[2rem] cursor-pointer " onClick={() => setClick(!click)}/> : <GiHamburgerMenu className=" cursor-pointer text-[1.8rem]" onClick={() => setClick(!click)}/>
                        }
                    </div>
                    <div ref={el => menuRef = el} className="w-full nav flex bg-gradient-to-b  from-[#7e2626] rounded-md items-center justify-center px-3 py-5">

                        <ul className="ul flex flex-col gap-y-10  text-center items-center justify-cente">
                            <Link  to="/" className="transitoin-all duration-200 hover:translate-x-2">
                               <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><HomeOutlined /></span>Home</li>
                            </Link> 
                            <Link to="/search"   className="transitoin-all duration-200 hover:translate-x-2">
                                <li   className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><SearchOutlined /></span>Search</li>
                            </Link> 
                            <Link   to="/watch"  className="transitoin-all duration-200 hover:translate-x-2">
                                <li   className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><PlayCircleOutlined /></span>Watch</li>
                            </Link>

                            {   
                                current_token === null ?
                                <Link   to="/login"  className="transitoin-all duration-200 hover:translate-x-2">
                                    <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"><span className="mr-1 flex items-center "> <LoginOutlined /></span>SignIn</li>
                                </Link>
                                :
                                <Link   to="/account"  className="transitoin-all duration-200 hover:translate-x-2">
                                    <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"><span className="mr-1 flex items-center "> <RiAccountCircleLine /></span>Account</li>
                                </Link>
                            }
                            
                            { current_token === null 
                                ? 
                                <Link  to="/signup"  className="transitoin-all duration-200 hover:translate-x-2">
                                    <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><LogoutOutlined /></span>SignUP</li>
                                </Link>
                                : ""
                            } 
                        </ul>
                    </div>
                </div>
               
            </div>
            <div className="search absolute flex w-full  top-[15%] left-[10%] ">
                <div  className="text-white w-full" >
                    <CloseCircleOutlined onClick={(events) => emptyInput(events)} className="absolute lg:left-[5%] z-10 cursor-pointer left-[5%] top-[20%] text-[1.8rem]"/>
                    <input id="inputs" ref={el => searchBar = el} onChange={(happening) => { setInput(happening.target.value);}}  className="w-[80%] bg-[#343131] outline-none rounded-md text-center px-10 py-3" type="text" placeholder='movie name' /> <SearchOutlined ref={el => button = el} onClick={() => setSearchIcon(!searchIcon)} className='transition-all duration-200 hover:-translate-y-2 absolute  lg:right-[25%] right-[25%] top-[20%] text-[1.7rem] ml-2'/>
                </div>
            </div>
            <div className="searchResult text-center relative">
              {
                searchIcon && input !== undefined && input !== null && input !== "" ? <SearchMovie data={input} id="one"  endpoint={`https://api.themoviedb.org/3/search/movie/?api_key=${key}&langauge=en-US&&page=1&query=${input}`} which="Movies"/> : ""
              }
              {
                searchIcon && input !== undefined && input !== null && input !== ""  ? <SearchMovie id="two"  endpoint={`https://api.themoviedb.org/3/search/tv/?api_key=${key}&langauge=en-US&&page=1&query=${input}`} which="Tv Shows"/> : ""
              }
            </div>
            <Footer />
        </div>
    );
}

export default Search;
