import React from 'react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import error from "../images/netflix.jpg"
import {AiOutlineLike} from 'react-icons/ai';
import {MdPlayCircleOutline} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {useGloablData} from "../context/GlobalData";
import {CgClose} from 'react-icons/cg';

const FavoriteMovies = () => {

    const [favorites, setFavorites] = useState([]);
    const [{current_token}] = useGloablData();
    const [ID, setId] = useState(0);
    
  
    let imageRef = useRef();

    const key = "6fab499c3bcdf2439b4e10623aeb3996";

    useEffect( () => {

        const getIds = async () => {

            let url = `http://localhost:3001/get_ids?key=${current_token}`;
            try {
                const response = await axios.get(url);
                getAsyncData([...new Set(response.data.ids)]);
            } catch(error) { console.log(error)}
        }
        const getAsyncData = async (allMovies) => {
            
            let movieData = [];
            for (let id of allMovies) {
                let similarRequest = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&page=1`
                
                try {
                    const response = await axios.get(similarRequest);
                    const {poster_path, id, original_title, vote_average} = response.data;
                    movieData.push({poster_path, original_title, vote_average, id});
                    // setFavorites(moviesList => [...moviesList, backdrop_path, id, original_title, vote_average]);
                }
                catch( error) { 
                    console.log(error)
                };       
            }
            setFavorites(movieData);
        }
        getIds();
        //getAsyncData();
    }, [ID, current_token]);

    const sendMovieDetails = (event) => {
        
        let movieName = event.target?.parentElement?.id
        
        event.stopPropagation();

        if (event.target.localName === "img") movieName = event.target?.alt
        else if (event.target.localName === "svg") movieName = event.target?.parentElement?.parentElement?.previousSibling?.alt;
        
        else if (event.target.localName === "path") movieName = event.target?.parentElement?.parentElement?.parentElement?.previousSibling?.alt;
        
        else if (event.target.localName === "div") movieName = event.target?.nextElementSibling?.alt;

        const data ={ name: movieName, isNum: true}
        navigator("/one", {state: data});   
    }

    const makeMovieHidden = (event) => {
        
        event.stopPropagation();
        let mainId;
    
        if (event.target?.localName === "svg") mainId = event.target?.parentElement?.parentElement?.id;
        else mainId = event.target?.parentElement?.parentElement?.parentElement?.id;
        
        deleteMovieOnClick(mainId);  
    };

    const deleteMovieOnClick = async (id) => {
       
        try {
            const response = await axios.post("http://localhost:3001/api/delete_id", {movie_id: id});
            setId(id);
            response.data.message === "deleted" ? toast.success("movie deleted", {closeOnClick: true, autoClose: 500}) : toast.warn("failed to delete", {closeOnClick: true, autoClose: 500});
        } catch (error) { console.log(error)}
    }

    
    
    let navigator = useNavigate();

    const setAlternateImage = () => { imageRef.current.src=error; }
   
    return (
        <div className="w-fit h-fit absolute top-[100%] overflow-hidden lg:left-[3%] ">
            
            <h1 className="text-[orangered] ml-10 mt-10 lg:text-3xl lg:mt-10 "> Movies You Liked </h1>
            <div  className="cardparent w-full  h-full flex flex-row flex-wrap gap-x-3 lg:gap-x-0  items-center justify-center">
           
            {
                favorites.map( (item, index) => {                    
                    return (
                        <div key={item?.id} id={item?.id} onClick={(event) => sendMovieDetails(event)} className="mt-4 cursor-pointer  w-fit h-fit">
                            <div id={item?.id}  className="group notify hover:scale-[1.000001] transition-all">

                                <div className="bg-[#e6d6d6] px-4 rounded-md  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 lg:right-6 right-2  items-center justify-center">
                                    <span className="text-center font-semibold rounded-md">HD</span>
                                </div>
                                <div   className="hello absolute h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 lg:w-[13rem] md:w-[12rem] w-[10rem] "> </div>
                                
                                <img ref={imageRef} className="  object-contain lg:w-[13rem] md:w-[12rem]  h-full text-white w-[10rem] flex flex-col   rounded-md" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item?.original_title} onError={setAlternateImage}   />
                            
                                <div>
                                    <span className="hidden transition group-hover:block w-[10rem] ml-2 absolute lg:top-[40%] lg:left-[35%] top-[30%] left-[30%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                                </div>

                                <div className="lg:w-[14rem] md:w-[12rem] w-[10rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                                    <span  className="move clamp font-semibold text-gray-500 transition-all group-hover:text-gray-200 lg:text-[1.1rem] text-xsm"> {item?.original_title !== undefined ? item?.original_title : item?.name} </span>
                                </div>
                                <div  className="flex -mt-1 text-gray-500 transition-all group-hover:text-gray-200 justify-start items-center ">  <AiOutlineLike/>  <span className="ml-1"> {item?.vote_average}</span> </div>

                                <div id={index}  className="z-10 bg-[#877c7c] rounded-md text-[black] text-xl hidden group-hover:flex  absolute top-2 p-1 left-2  items-center justify-center"
                                    onClick={(event) => makeMovieHidden(event)}>
                                    <CgClose  id={index} onClick={(event) => makeMovieHidden(event)}/>
                                </div>
                            </div>
                        </div>
                    )
               })
            }
            </div>
        </div>
    );
}

export default FavoriteMovies;
