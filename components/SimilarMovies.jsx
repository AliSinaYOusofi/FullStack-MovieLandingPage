import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import error from "../images/netflix.jpg"
import {AiOutlineLike} from 'react-icons/ai';
import {MdPlayCircleOutline} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegHeart} from 'react-icons/fa';
import {useGloablData} from "../context/GlobalData"


const SimilarMovies = ({id, what}) => {

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

    const showToast = (what) => {
        if (what === "1 Movie was added") toast.success(what, {closeOnClick: true})
        else toast.warning(what, {closeOnClick: true})
    }
    
    let navigator = useNavigate();

    const key = "6fab499c3bcdf2439b4e10623aeb3996";
    let part = what === "Recommended Movies" ? "recommendations" : "similar";

    let similarRequest = `https://api.themoviedb.org/3/movie/${id}/${part}?api_key=${key}&language=en-US&page=1`
    
    const [similar, setSimilar] = useState([]);
   
    let imageRef = useRef();

    useEffect( () => {
        if (id) {
            axios.get(encodeURI(similarRequest))
            .then(response => {
                setSimilar(response.data.results);
            })
            .catch(error => console.log(error));
        }
    }, [id, similarRequest]);

    const setAlternateImage = () => {
        imageRef.current.src=error;
    }

    const truncate = (text, lang) => {  
        if (text === undefined) { return "unkown"}
        if (text.length >= 20 && lang !== "ja") {
  
              return text.substr(0, 17) + "..."
          } else if (lang === "ja" || lang === "jp") {
              if (text.length >= 12) {
  
                  return text.substr(0, 10) + "..."
              }
              return text
          }
          else {
              return text.substr(0, 17)
          }
    }
    


    const sendMovieDetails = (event) => {
        
        let movieName; 
        event.stopPropagation();

        if (event.target?.localName === "div") movieName = event.target?.nextElementSibling?.alt
        else if (event.target?.localName === "img") movieName = event.target?.alt;
        else if (event.target?.localName === "span") movieName = event.target?.innerHTML;
        else if (event.target?.localName === "svg") movieName = event.target.parentElement?.parentElement?.parentElement?.parentElement?.id
        
        const data ={ name: movieName, boolean: true}
        navigator("/one", {state: data});   
    }    

    const sendFavoriteIds = async (mainId) => {

        try {
            await axios.post("http://localhost:3001/movie_ids", {token: current_token, ids: mainId});
        } catch( error ) { console.log(error)}
    }
   
    return (
        <>
            <div className="w-fit h-fit">
            <h1 className="text-[orangered] ml-10 lg:text-3xl lg:mt-10 "> {what}</h1>
            <div id={id}   className="cardparent w-full h-full flex flex-row flex-wrap gap-x-2  items-center justify-center">
           
           {
               similar.map( (item, index) => {
                  
                    let source = item?.poster_path === null ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${item?.poster_path}`;
                    if (item?.poster_path === null && item?.backdrop_path === null) { source=error}
                    
                    return (
                       <div key={item?.id} id={item?.id} onClick={(event) => sendMovieDetails(event)} className="mt-4 cursor-pointer  group hover:scale-105 transition-all">
                    
                            <div className="bg-[#e6d6d6] px-4 rounded-md  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                <span className="text-center font-semibold rounded-md">HD</span>
                            </div>
                            <div   className="hello absolute h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[14rem] md:w-[12rem] w-[10rem] "> </div>
                            
                            <img ref={imageRef} style={{marginTop: item?.poster_path === null  ? "3rem" : "0"}}   className="  object-contain lg:w-[14rem] md:w-[12rem] text-white w-[10rem] flex flex-col   rounded-md" src={source} alt={item?.title} onError={setAlternateImage}   />
                        
                            <div>
                                <span className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[30%] left-[30%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                            </div>

                            <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                <span  className="move clamp font-semibold text-gray-500 transition-all group-hover:text-gray-200 text-[1.1rem]"> {item?.original_title !== undefined ? truncate(item?.original_title, item?.original_language) : truncate(item?.name, item?.original_language)} </span>
                            </div>
                            <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center ">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>

                            <div id={index}  className="z-10 bg-[#877c7c] rounded-md text-[black] text-xl hidden group-hover:flex  absolute top-2 p-1 left-2  items-center justify-center"
                                onClick={(event) => weHeartIt(event)}>
                                <FaRegHeart id={index} onClick={(event) => weHeartIt(event)}/>
                            </div>
                        </div>
                    )
               })
            }
            </div>
        </div>
        </>
    );
}

export default SimilarMovies;
