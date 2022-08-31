import React, { useEffect, useRef, useState } from 'react';
import {AiOutlineLike} from 'react-icons/ai';
import {MdPlayCircleOutline} from 'react-icons/md';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import axios from 'axios';
import error from "../images/netflix.jpg"
import {useNavigate} from 'react-router-dom';
import { FaRegHeart} from 'react-icons/fa';
import { useGloablData } from '../context/GlobalData';
import { ToastContainer, toast } from 'react-toastify';

const SearchMovie = ({endpoint, which, id}) => {

    const [{current_token}] = useGloablData();
    const [movies, setMovies] = useState([]);
    const [click, setClick] = useState(false); 

    let one = useRef();
    let two = useRef();
    let zero = useRef();
    let imageRef = useRef();

    useEffect( () => {
       
        axios.get(encodeURI(endpoint))
        .then( response => setMovies(response.data.results))
        .catch(error => console.log(error))
    }, [ endpoint])
   
    const random = Math.floor(Math.random() * movies.length);

    const appendMovies =  () => {
       
        let uri = String(endpoint).split("");
        
        uri[uri.lastIndexOf("1")] = random
        uri = uri.join("");
        
        axios.get(encodeURI(uri))
            .then( response =>  setMovies(movies.concat( response.data.results)))
            .catch( error => console.log(error));

        setClick(!click)
    }   

    gsap.registerPlugin(ScrollToPlugin)
    
    const move = (part) => {
        if (part === 0) {
            gsap.to(window, {scrollTo: 0});
            zero.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            one.current.style.backgroundColor="rgb(30, 30, 30)";
        }
        else if (part === 1) {
    
            gsap.to(window, {scrollTo: "#one", duration: 1, opacity: 20});
            one.current.style.backgroundColor="red";
            two.current.style.backgroundColor="rgb(30, 30, 30)";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
           
        }
        else if (part === 2) {
            gsap.to(window, {scrollTo: "#two", duration: 1});
            one.current.style.backgroundColor="rgb(30, 30, 30)";
            two.current.style.backgroundColor="red";
            zero.current.style.backgroundColor="rgb(30, 30, 30)";
        }
    }

    const alternateImage = () => { imageRef.current.src=error; }

    let navigator = useNavigate();

    const sendMovieDetails = (event, part) => {
        
        event.stopPropagation();
        
        let movieName;
        
        if (event.target?.localName === "div" && part === 1) movieName = event.target?.nextElementSibling?.alt
        
        else if (event.target?.localName === "img" && part === 1) movieName = event.target?.alt;
    
        else if (event.target?.localName === "span" && part === 1) movieName = event.target?.innerHTML;
        
        const data ={ name: movieName, boolean: true};
        navigator("/one", {state: data});   
    }

    const sendFavoriteIds = async (mainId) => {
        
        try {
            await axios.post("http://localhost:3001/movie_ids", {token: current_token, ids: mainId});
        } catch( error ) { console.log(error)}
    }

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

    const showToast = (what) => { what === "1 Movie was added" ? toast.success(what, {autoClose: 500, closeOnClick: true}) : toast.warning(what, {autoClose: 500, closeOnClick: true}) }

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
        <div className="searchResult scroll-smooth relative">
             <h1  className="text-white ml-8 text-[2rem] lg:ml-5 mt-14"> {which} </h1>
            <div id={id}   className="cardparent relative w-full h-full flex flex-row flex-wrap gap-x-2  items-center justify-center">
           
                {
                    movies.map( (item, index) => {
                       
                        let source = item?.poster_path === null ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${item?.poster_path}`;
                        if (item?.poster_path === null && item?.backdrop_path === null) { source=error}
                        return (
                            <div id={item?.id} key={item?.id}  onClick={(event) => sendMovieDetails(event, 1)}  className="mt-4 z-1 cursor-pointer  group hover:scale-105 transition-all">
                               
                                    <div className="bg-[#e6d6d6] rounded-md px-4  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                        <span className="text-center font-semibold ">HD</span>
                                    </div>
                                    <div   className="hello absolute h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[14rem] md:w-[12rem] w-[10rem] "> </div>
                                    
                                    <img ref={imageRef} style={{marginTop: item?.poster_path === null  ? "3rem" : "0"}}   className="z-auto  object-contain lg:w-[14rem] md:w-[12rem] text-white w-[10rem] flex flex-col   rounded-md" src={source} alt={item?.title} onError={alternateImage}   />
                                
                                    <div>
                                        <span className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[30%] left-[30%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                                    </div>

                                    <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                        <span  className="move font-semibold text-gray-500 transition-all group-hover:text-gray-200 text-[1.1rem]"> {item?.original_title !== undefined ? item?.original_title : item?.name} </span>
                                    </div>
                                    <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center ">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>
                                    {   current_token !== undefined && current_token !== null 
                                        ? 
                                            <div id={index}  className="z-10 bg-[#877c7c] rounded-md text-[black] text-xl hidden group-hover:flex  absolute top-2 p-1 left-2  items-center justify-center"
                                                onClick={(event) => weHeartIt(event)}>
                                                <FaRegHeart id={index} onClick={(event) => weHeartIt(event)}/>
                                            </div>
                                        : ""
                                    }
                            </div>
                        )
                    })
                }
            </div>
            
            
            <div  className="fixed w-[10rem] rounded-md left-[40%] top-[85%] h-[10%]
            flex flex-row justify-around items-center transition-all duration-200  hover:opacity-80 bg-black">
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="ze" ref={zero} onClick={() => {move(0)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >0</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="on" ref={one} onClick={() => {move(1)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >1</span></div>
                <div style={{backgroundColor: "rgb(30, 30, 30)"}} id="tw" ref={two} onClick={() => {move(2)}} className="w-[2rem]  h-[2rem] rounded-full flex items-center justify-center cursor-pointer outline-none"><span className="text-black transition-all"  >2</span></div>
            </div>
                <button onClick={appendMovies} className="text-white px-5 py-2 bg-red-600 rounded-md font-mono mt-4 absolute left-[40%] lg:left-[45%]">Load More</button>
            </div>
        
        <Notfications />
     </>
    );
}

export default SearchMovie;