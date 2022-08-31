import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AiOutlineLike} from 'react-icons/ai';
import {MdPlayCircleOutline} from 'react-icons/md';
import "../font.css";
// gsap
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { useNavigate } from 'react-router-dom';
import {useGloablData} from "../context/GlobalData";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaRegHeart} from 'react-icons/fa';

const MovieCards = ({title, urlEndPoint, id}) => {

    const [movies, setMovies] = useState([]);
    
    const [{current_token}] = useGloablData();

    const weHeartIt = (event) => {
        
        event.stopPropagation();
        
        const mainId = event.target?.parentElement?.parentElement?.id;
        
        if (document.getElementById(event.target?.id).style.backgroundColor === "red"){
            showToast("1 Movie was removed")
            document.getElementById(event.target?.id).style.backgroundColor = "white";
        } else {
            showToast("1 Movie was added")
            document.getElementById(event.target?.id).style.backgroundColor = "red";
        }
        sendFavoriteIds(mainId);
    }

    const showToast = (what) => { what === "1 Movie was added" ? toast.success(what) : toast.warning(what) }

    gsap.registerPlugin(ScrollTrigger);
    
    let one = useRef();
    let two = useRef();
    let three = useRef();
    let four = useRef();
    let zero = useRef();
    const parentDivRef = useRef();
    
    useEffect( () => {
        const getAsyncData = async () => {
            try {
                const response = await axios.get(urlEndPoint);
                setMovies(response.data.results);
            }
            catch( error) { console.log(error) };       
        }
        getAsyncData();
    }, [urlEndPoint]);
    
    gsap.registerPlugin(ScrollToPlugin);

    const move = (part) => {
        if (part === 0) {

            gsap.to(window, {scrollTo: 0});
            
            zero.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
            four.current.style.backgroundColor="rgb(30, 30, 30)";
            one.current.style.backgroundColor="rgb(30, 30, 30)";
        }

        else if (part === 1) {
    
            gsap.to(window, {scrollTo: "#one"});
            one.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
            four.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
           
        }
        else if (part === 2) {
            gsap.to(window, {scrollTo: "#two", duration: 1});
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="red";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
            four.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";

        }
        else if (part === 3) {
            gsap.to(window, {scrollTo: "#three", duration: 1});
            three.current.style.backgroundColor="red";
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            four.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";

        }
        else if(part === 4) {
            gsap.to(window, {scrollTo: "#four", duration: 1});
            four.current.style.backgroundColor="red";
            three.current.style.backgroundColor="rgb(30, 30, 30)";
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";

        }   
    }

    const sendMovieDetails = (event) => {
        
        let movieName;

        if (event.target?.localName === "div")  movieName = event.target?.nextElementSibling?.alt
        else if (event.target?.localName === "img")  movieName = event.target?.alt;
        else if (event.target?.localName === "span")  movieName = event.target?.innerHTML;
        else if (event.target?.localName === "svg")  movieName = event.target.parentElement?.parentElement?.parentElement?.id
        
        // sending data to backend
        const data = { name: movieName, boolean: false}
        navigator("/one", {state: data});   
    }

    const sendFavoriteIds = async (mainId) => {
        
        try {
            const response = await axios.post("http://localhost:3001/movie_ids", {token: current_token, ids: mainId});
            console.log(response);
        } catch( error ) { console.log(error)}
    }

    const navigator = useNavigate();

    return (
        <>
        <div id={"card"} className="cards w-full h-full text-el   flex flex-row flex-wrap mt-20 items-center justify-center">
            <div  className="w-full flex items-start ml-8 lg:ml-5 ">
                <h1  id={id}  className="header text-gray-400 text-2xl lg:text-4xl" > #{title}</h1> <hr />
            </div>
            <div   className="w-full h-full flex flex-row flex-wrap gap-x-2     items-center justify-center">
                {
                    
                    movies.map( (item, index) => {
                        let alt = item?.original_title === undefined ? item?.name : item?.original_title;
                        
                        if (alt === undefined) {
                            alt = item?.title;
                        }

                        return (
                            
                            <div id={item?.id} key={item?.id} ref={parentDivRef}  onClick={(event) => sendMovieDetails(event)} className="mt-4 cursor-pointer  group hover:scale-105 transition-all">
                                <div className="bg-[#e6d6d6] px-4 rounded-md  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                    <span className="text-center font-semibold ">HD</span>
                                </div>
                                
                                <div   className="hello z-1 absolute top-0 h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[14rem] md:w-[12rem] w-[10rem] "> </div>
                                <img  id="image"   className="z-10  object-contain lg:w-[14rem] md:w-[12rem] w-[10rem] flex flex-col   rounded-md" src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} alt={alt}    />
                            
                                <div onClick={(event) => sendMovieDetails(event)}>
                                    <span  className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[35%] left-[30%] text-center text-5xl" ><MdPlayCircleOutline /></span>
                                </div>
                                <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                    <span  className="move clamp font-semibold text-gray-500 transition-all group-hover:text-gray-200 text-[1.1rem]"> {item?.original_title !== undefined ? item?.original_title : item?.name} </span>
                                </div>
                                <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>
                                <div id={index}  className="z-10 bg-[#877c7c] rounded-md text-[black] text-xl hidden group-hover:flex  absolute top-2 p-1 left-2  items-center justify-center"
                                    onClick={(event) => weHeartIt(event)}>
                                    <FaRegHeart id={index} onClick={(event) => weHeartIt(event)}/>
                                </div>
                            </div>
                            
                        )
                    })
                }
            </div>
            <div className="fixed w-[20rem] rounded-md top-[85%] h-[10%]
            flex flex-row justify-around items-center transition-all duration-200 opacity-30 hover:opacity-80 " style={{backgroundColor: "rgb(18, 18, 18)"}}>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="ze" ref={zero} onClick={() => {move(0)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >0</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="on" ref={one} onClick={() => {move(1)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >1</span></div>
                <div  style={{backgroundColor: "rgb(30, 30, 30)"}} id="tw" ref={two} onClick={() => {move(2)}} className="w-[2rem] bg-white h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all" >2</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="thre" ref={three} onClick={() => {move(3)}} className="w-[2rem] bg-white h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >3</span></div>
                <div  style={{backgroundColor: "rgb(30, 30, 30)"}} id="fou" ref={four} onClick={() => {move(4)}} className="w-[2rem] bg-white h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >4</span></div>
            </div>
        </div>
            <div className="text-white notify">
              <ToastContainer 
                  pauseOnHover={true} 
                  autoClose={500}
                  hideProgressBar={false}
                  closeButton={true}
                  closeOnClick={true}
              />
            </div>
        </>
    );
}
export default MovieCards;