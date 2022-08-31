import React, { useEffect, useRef, useState } from 'react';
import {MdPlayCircleOutline} from 'react-icons/md';
import {AiOutlineLike} from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../font.css";
import error from "../images/netflix.jpg";
import { useGloablData } from '../context/GlobalData';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegHeart} from 'react-icons/fa';

const OnChangeSearch = ({input}) => {

    // my state variables
    const [heartes, setHearts] = useState([]);
    const [{current_token}] = useGloablData();
    const [searchMovies, setSearchMovies] = useState([]);
    const myImageRef = useRef();
    
    // changing b/w comps
    let navigator = useNavigate();

    // liked and dislilked movies
    const weHeartIt = (event) => {
        
        event.stopPropagation();
        const mainId = event.target?.parentElement?.parentElement?.id
        
        if (heartes.includes(mainId)){
            showToast("1 Movie was removed");
            document.getElementById(event.target?.id).style.backgroundColor = "white"
           
        } else {
            showToast("1 Movie was added")
            document.getElementById(event.target?.id).style.backgroundColor = "red";
        }
        
        setHearts(heartes => [...heartes, mainId]);
    };
    // little toast messages
    const showToast = (what) => { what === "1 Movie was added" ? toast.success(what) : toast.warning(what) }
    // rendering another component with diff movies
    const sendMovieDetails = (event) => {
        let movieName;

        setHearts([...new Set(heartes)]);
      
        event.stopPropagation();

        if (event.target?.localName === "div") movieName = event.target?.nextElementSibling?.alt
        else if (event.target?.localName === "img") movieName = event.target?.alt;
        else if (event.target?.localName === "span") movieName = event.target?.innerHTML;
        else if (event.target?.localName === "svg") movieName = event.target.parentElement?.parentElement?.parentElement?.parentElement?.id

        const data ={ name: movieName, boolean: true};
        // save the favorite ids before navigating to the next comp
        sendFavoriteIds();
        navigator("/one", {state: data});   
    }
    // send ids to backend
    const sendFavoriteIds = async () => {
        try { await axios.post("http://localhost:3001/movie_ids", {token: current_token, ids: heartes});
        } catch( error ) { console.log(error)}
    }
    // should be in .env file but did not do it
    const key = "6fab499c3bcdf2439b4e10623aeb3996";
    const searchURL = `https://api.themoviedb.org/3/search/movie/?api_key=${key}&langauge=en-US&&page=1&query=${input}`
    
    // get movies on initial render
    useEffect ( () => {
        async function searchMoviess () {
            const response = await axios.get(encodeURI(searchURL));
            setSearchMovies(response.data.results);
        }
        searchMoviess();
        if(input === "") setSearchMovies([]);
    }, [input, searchURL]);
    // set alternative image if error on image tag
    const setAlternateImage = () => { myImageRef.current ? myImageRef.current.src=error : myImageRef.current.src=error;}

    // for handling movie not found ont tmdb
    if (searchMovies[0]?.original_title === "UNdefined") { searchMovies.length = 0; }

    // load more data onClick
    let random = Math.floor(Math.random() * 10);
    
    const loadMoreMovies = async () => {
       
        let uri = String(searchURL).split("");
        
        uri[uri.lastIndexOf("1")] = random
        uri = uri.join("");
        
        await axios.get(encodeURI(uri))
            .then( response => setSearchMovies(searchMovies.concat(response.data.results)))
            .catch( error => console.log(error));
    }

    return (
        <>
            <div   className="w-full h-full flex flex-row flex-wrap gap-x-2     items-center justify-center">
            {
                searchMovies.length >= 0 ?
                searchMovies.map( (item, index) => {
                    let alt = item?.original_title === undefined ? item?.name : item?.original_title;
                    
                    if (alt === undefined) {
                        alt = item?.title;
                    }

                    let source = item?.poster_path === null ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${item?.poster_path}`;
                    if (item?.poster_path === null && item?.backdrop_path === null) { source=error}
                    return (
                        <div key={item?.id} id={item?.id} onClick={(event) => sendMovieDetails(event)}>
                            <div id={item?.id}  className="mt-4 cursor-pointer  group hover:scale-105 transition-all">
                                <div id={index}  className="z-10 bg-[#877c7c] rounded-md text-[black] text-xl hidden group-hover:flex  absolute top-2 p-1 left-2  items-center justify-center"
                                    onClick={(event) => weHeartIt(event)}>
                                    <FaRegHeart id={index} onClick={(event) => weHeartIt(event)}/>
                                </div>
                                <div className="bg-[#e6d6d6] px-4 rounded-md  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                    <span className="text-center font-semibold ">HD</span>
                                </div>
                                <div   className="hello z-1 absolute top-0 h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[14rem] md:w-[12rem] w-[10rem] "> </div>
                                <img ref={myImageRef} onError={setAlternateImage} id="image"   className="z-10  object-contain lg:w-[14rem] md:w-[12rem] w-[10rem] flex flex-col   rounded-md" src={source} alt={item?.title}    />
                            
                                <div onClick={(event) => sendMovieDetails(event)}>
                                    <span  className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[35%] left-[30%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                                </div>
                                
                                <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                    <span  className="clamp move font-semibold text-gray-500 transition-all group-hover:text-gray-200 text-[1.1rem]"> {item?.original_title !== undefined ? item?.original_title : item?.name} </span>
                                </div>
                                <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>
                            </div>
                        </div>
                    )
                })
            : ""}
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
        <div>
            { 
                (input === undefined || input.length === 0)
                ? ""
                : <button onClick={loadMoreMovies} className="text-white px-5 py-2 bg-red-600 rounded-md font-mono mt-4 absolute left-[40%] lg:left-[45%]"> Next Page </button>
            }
        </div>
        </>
    );
}

export default OnChangeSearch;
