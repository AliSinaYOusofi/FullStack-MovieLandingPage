import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import error from "../images/netflix.jpg"
import {AiOutlineLike} from 'react-icons/ai';
import {MdPlayCircleOutline} from 'react-icons/md';

const RecommendMovies = ({id, what}) => {
    
    const key = "6fab499c3bcdf2439b4e10623aeb3996";
    
    const similarRequest = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`
    
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
    }, []);

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
    console.log(similar, id);
    return (
        <div className="w-fit h-fit">
            <h1 className="text-white ml-10 lg:text-3xl"> {what}</h1>
            <div id={id}   className="cardparent w-full h-full flex flex-row flex-wrap gap-x-2  items-center justify-center">
           
           {
               similar.map( (item, index) => {
                  
                   let source = item?.poster_path === null ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${item?.poster_path}`;
                   if (item?.poster_path === null && item?.backdrop_path === null) { source=error}
                   return (
                       <div className="mt-4 cursor-pointer  group hover:scale-105 transition-all">
                          

                               <div className="bg-[#e6d6d6] px-4  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                   <span className="text-center font-semibold ">HD</span>
                               </div>
                               <div   className="hello absolute h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[14rem] md:w-[12rem] w-[10rem] "> </div>
                               
                               <img style={{marginTop: item?.poster_path === null  ? "3rem" : "0"}}   className="  object-contain lg:w-[14rem] md:w-[12rem] text-white w-[10rem] flex flex-col   rounded-md" src={source} alt={item?.title} onError={setAlternateImage}   />
                           
                               <div>
                                   <span className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[30%] left-[30%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                               </div>

                               <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                   <span  className="move font-semibold text-gray-500 transition-all group-hover:text-gray-200 text-[1.1rem]"> {item?.original_title !== undefined ? truncate(item?.original_title, item?.original_language) : truncate(item?.name, item?.original_language)} </span>
                               </div>
                               <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center ">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>
                          
                       </div>
                   )
               })
           }
            </div>
        </div>
    );
}

export default RecommendMovies;
