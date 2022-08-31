import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import {GiHamburgerMenu, GiCrossMark} from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom';
import {HomeOutlined, LoginOutlined, LogoutOutlined, PlayCircleOutlined,SearchOutlined, CloseCircleOutlined} from '@ant-design/icons'
import axios from 'axios';
import "../font.css"
import { ScrollToPlugin} from 'gsap/all';
import error from "../images/netflix.jpg"
import gsap from 'gsap';
import SimilarMovies from './SimilarMovies';
import OnChangeSearch from './OnChangeSearch';
import { useGloablData } from '../context/GlobalData';
import {RiAccountCircleLine} from 'react-icons/ri';

const OneMovie = () => {

    const [click, setClick] = useState(false);
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const [input, setInput] = useState();
    const [movies, setMovies] = useState([]);
    const [cast, setCast] = useState([]);
    const [render, setRender] = useState(false);

    
   

    const location = useLocation();    

    let menuRef = useRef();
    let searchRef = useRef();
    let header = useRef();
    let button = useRef();
    let burger = useRef();
    let searchBar = useRef();
    let closeIcon = useRef();
    let poster = useRef();
    let backdrop = useRef();
    let castRef = useRef();

    const key = "6fab499c3bcdf2439b4e10623aeb3996";

 
    let requestSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}&langauge=en-US&query=${location.state.name}&page=1`;

    const [{current_token}, ] = useGloablData();

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
               stagger: 0.4
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
            duration: 1
        });
        if (counter === 1) {
            const timeline = gsap.timeline();
            timeline.from(header, {
               
                opacity: 0,
               
            }).from(burger, {
              
                opacity: 0,
                
            }).from(button, {
              
                opacity: 0,
                
            }).from(searchBar, {
               
                opacity: 0,
               
            }).from(closeIcon, {
               
                opacity: 0,
               
            })
        }
    }, [counter]);

    useEffect( () => {

        gsap.to(window, {scrollTo: 240});
        setRender(location.state.boolean)
        axios.get((requestSearchMovie))
            .then(response => setMovies([response.data.results[0]]))
            .catch(error => console.log(error));

    }, [render, location.state.name, location, location.state.boolean, requestSearchMovie]);

    useEffect(  () => {

        async function getData () {
            let profile = [];

            try {
                if (movies && movies[0]?.id) {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movies[0]?.id}/credits?api_key=6fab499c3bcdf2439b4e10623aeb3996&`)
                   
                    response.data.cast.forEach( item => {
                        if (item?.profile_path !== null) {
                            profile.unshift(item);
                        }
                    })
                }
            } catch(error) {
                console.log(error)
            }
            if (profile.length <= 3) {
                setCast([]);
            } else {
                setCast(profile);
            }
        }
        getData()
    }
        
    , [movies, render])
    
    const showSearchBar = () => {
        setSearch(!search);
        
        if (!search) {
            gsap.to(searchRef, {
                y: 0,
                opacity: 100,
                ease: "ease.in",
                duration: 1,
                stagger: 1
            })
        } else {
            gsap.to(searchRef, {
                y: -1200,
                opacity: 10,
                ease: "ease.in",
                duration: 1
            })
        }
    }
    gsap.registerPlugin(ScrollToPlugin)
   
    function emptyInput(events) {
        
        setInput("");
        document.getElementById("input").value = "";
    }
   
    

    const setAlternateImage = () => {
        
        if (poster.current) {
            poster.current.src=error;
            backdrop.current.src=error;
        }
       
    }
    
    cast.length = 9
   

    const moveToSearch = () => { gsap.to(window, {scrollTo: 1200});}

    // easy navigation
    let one = useRef();
    let two = useRef();
    let zero = useRef();
    let three = useRef();

    gsap.registerPlugin(ScrollToPlugin)

    const move = (part) => {
        if (part === 0) {
            gsap.to(window, {scrollTo: 0});
            zero.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
        }
        else if (part === 1) {
    
            gsap.to(window, {scrollTo: "#one", duration: 1, opacity: 20});
            one.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
           
        }
        else if (part === 2) {
            gsap.to(window, {scrollTo: "#two", duration: 1});
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="red";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
        }
        else if (part === 3) {
            gsap.to(window, {scrollTo: "#three", duration: 1});
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="red";
        }
    }

    return (
        <>
            <div className="w-full h-full absolute">
            
            <div className="w-full h-full absolute">
                <div className="w-full h-[700px]">
                    <div   className="hello w-full absolute top-0 h-[700px]    bg-gradient-to-b from-black/90 "> </div>
                    <img ref={el => backdrop = el}  className="w-full rounded-bl-xl  rounded-br-xl h-[60%] lg:h-[70%] object-cover" src={`https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path}`} alt="error" onError={setAlternateImage}/>
                    <div className="absolute top-0 left-0 bg-gradient-to-t from-black/90 w-full h-full" />
                </div>
                <div className="flex flex-row lg:-gap-x-14 justify-center items-center  text-white w-full h-full absolute top-[34%] lg:top-[44%]  px-2 gap-x-2">
                        <div className="lg:w-[20rem]">
                            <img ref={el => poster = el} onError={setAlternateImage} className=" h-[60%] rounded-xl" src={`https://image.tmdb.org/t/p/original/${movies[0]?.poster_path}`} alt="error" />
                        </div>
                    
                        <div className="flex flex-col gap-y-3 lg:gap-y-8 lg:-mt-20 lg:mr-[10rem]">
                            <div>
                                <h1 className="clamp  text-[1.4rem]"> {movies[0]?.original_title === undefined ? movies[0]?.name : movies[0]?.original_title}</h1>
                            </div>
                            <div className="">
                                <p className="">Released: {movies[0]?.release_date}</p>
                            </div>
                            <div className="">
                                <p className="">Country: USA</p>
                            </div>
                            <div className="">
                                <p className="">Language: {movies[0]?.original_language}</p>
                            </div>
                            <div className="">
                                <p className="">Average Vote: {movies[0]?.vote_average}</p>
                            </div>
                           
                            <div className="btn flex">
                                <button onClick={setAlternateImage} className="px-4 py-1 rounded-md transition-all duration-200 hover:scale-105 cursor-pointer"> Trailer </button>
                                <button className="px-4 py-1 rounded-md ml-3 transition-all duration-200 hover:scale-105 cursor-pointer"> Teaser </button>
                            </div>
                            <div className="btn flex">
                                <button className="px-4 py-1 rounded-md ml-3 transition-all duration-200 hover:scale-105 cursor-pointer"> Watch Now</button>
                            </div>
                            
                        </div>
                </div>
                <div className="text-white px-2 -mt-[6rem] lg:mt-20 lg:w-full lg:flex lg:items-center lg:justify-center
                lg:px-[7rem] lg:ml-10">
                    <p className=""> {movies[0]?.overview}</p>
                </div>
                <h1 className="text-[orangered] mt-10 ml-10 lg:text-3xl relative top-4">Cast</h1>
                <div  className="scroll- scrollba lg:scrollbar-hide px-2 scroll-smooth text-white flex flex-row mt-10 overflow-x-scroll   gap-x-1 w-full lg:h-fit ">
                   
                    {   
                        cast.map(item => (
                            <div key={item?.id} className="lg:w-full lg:h-full">
                                <div className="lg:w-full lg:h-full ">
                                    <img ref={castRef} onError={setAlternateImage} className="w-full h-full rounded-md object-cover" src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`} alt={""}/>
                                </div>
                                <p className="text-sm group-hover:line-clamp-none line-clamp-1 transition hover:line-clamp-none"> {item?.name}</p>
                            </div>
                        ))
                    }
                </div>
               
            <div className="">
            <h1 className="text-[orangered] ml-10 lg:text-3xl lg:mt-10 ">Search Results</h1>
                <div id="one">
                    <OnChangeSearch  input={input}/>
                </div>
                <div id="two">

                    {movies[0]?.id !== undefined ? <SimilarMovies  id={movies[0]?.id} what={"Similar Movies"}/> : ""}
                </div>
                <div id="three">
                {movies[0]?.id !== undefined ? <SimilarMovies id={movies[0]?.id} what={"Recommended Movies"}/> : ""}
                </div>
                <Footer />
            </div>
            </div>
            <div className="navbar   flex flex-row justify-between text-white w-full  absolute top-2">
                <div className="header">
                    <h1  className="text-[2rem] text-red-700 font-bold px-8 py-3 tracking-wider -mt-3" ref={el => header = el}>Netflix</h1>
                </div>
                <div   className="w-[10rem] mr-10 overflow-hidden  flex flex-col justify-end items-end">  
                    <div ref={el => burger = el} onClick={handleMenu} className="mt-4">
                        {
                            click ? <GiCrossMark className="text-[2rem] cursor-pointer " onClick={() => setClick(!click)}/> : <GiHamburgerMenu className=" cursor-pointer text-[1.8rem]" onClick={() => setClick(!click)}/>
                        }
                    </div>
                    <div   ref={el => menuRef = el} className="w-full nav flex bg-gradient-to-b  from-[#7e2626] rounded-md items-center justify-center px-3 py-5">

                        <ul className="ul flex flex-col gap-y-10  text-center items-center justify-cente">
                            <Link  to="/" className="transitoin-all duration-200 hover:translate-x-2">
                            <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><HomeOutlined /></span>Home</li>
                            </Link> 
                            <Link  onClick={showSearchBar} to="/search"   className="transitoin-all duration-200 hover:translate-x-2">
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
                <div  className="text-white w-full" ref={el => searchRef = el}>
                <CloseCircleOutlined ref={el => closeIcon = el} onClick={(events) => emptyInput(events)} className="absolute z-10 lg:left-[5%] cursor-pointer left-[5%] top-[20%] text-[1.8rem]"/>
                <input id="input" ref={el => searchBar = el} onChange={(event) => { setInput(event.target.value);}}  className="w-[80%] bg-[#b61414] outline-none rounded-md text-center px-10 py-3" type="text" placeholder='movie name' /> <SearchOutlined ref={el => button = el} onClick={moveToSearch} className='transition-all duration-200 hover:-translate-y-2 absolute  lg:right-[25%] right-[25%] top-[20%] text-[1.7rem] ml-2 cursor-pointer'/>
                </div>
            </div>
            
        </div>
       
        <div  className="fixed w-[15rem] rounded-md lg:left-[40%] left-[20%] top-[85%] h-[10%] font-semibold
            flex flex-row justify-between items-center transition-all duration-200 px-3  hover:opacity-100 opacity-80 bg-black">
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="ze" ref={zero} onClick={() => {move(0)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >0</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="on" ref={one} onClick={() => {move(1)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >1</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="tw" ref={two} onClick={() => {move(2)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >2</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="tw" ref={three} onClick={() => {move(3)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >3</span></div>
        
        </div>      
        </>
    );
}

export default OneMovie;