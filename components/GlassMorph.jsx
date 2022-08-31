import React, {useEffect, useRef, useState} from 'react';
import "../font.css";
import axios from 'axios';
import error from "../images/netflix.jpg"
import endPoints from '../requests/api';
import {DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import {MdPlayCircleOutline} from 'react-icons/md';


const GlassMorph = () => {
    
    let imageRef = useRef();
    const right = useRef();
    
    
    const [moviesList, setMoviesList] = useState([]);
    
    useEffect( () => {
        axios.get(endPoints.requestUpcomping)
            .then( response => setMoviesList(response.data.results))
            .catch(error => console.log(error));
    }, []);

    const setAlternateImage = () => {
        console.log("errro loading page");
        imageRef.current.src=error;
    }


    setInterval( () => {
        
    }, [1000]);

    const sliderLeft = () => { right.current.scrollLeft = right.current.scrollLeft - 300; }

    const sliderRight = () => { right.current.scrollLeft = right.current.scrollLeft + 300; }
    return (
        <>
        <div className="glass absolute  w-[100%]  top-[30%] bg-black bg-full h-[50%]">
           <div ref={right} className="cardparent flex flex-row gap-x-3 justify-start h-full overflow-x-scroll 
                  whitespace-nowrap scroll-smooth relative scrollbar-hide w-full">
           
           {
                moviesList.map( (item, index) => {
                  
                    let source = item?.poster_path === null ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${item?.poster_path}`;
                    if (item?.poster_path === null && item?.backdrop_path === null) { source=error}
                    return (
                        <div className="mt-8 flex flex-col grow  cursor-pointer  group hover:scale-105 transition-all">
                            <div className="bg-[#e6d6d6] px-4  hidden group-hover:flex   text-gray-900 w-[1.5rem]  absolute top-2 right-2  items-center justify-center">
                                <span className="text-center font-semibold ">HD</span>
                            </div>
                            <div   className="hello absolute h-2/3  rounded-md  transition-all group-hover:opacity-80 opacity-0 bg-gradient-to-b from-black/90 w-[8rem] "> </div>
                            
                            <img ref={imageRef} style={{marginTop: item?.poster_path === null  ? "3rem" : "0"}}   className="  object-contain   text-white w-[8rem] flex flex-col   rounded-md" src={source} alt={item?.title} onError={setAlternateImage}   />
                            <div>
                                <span className="hidden transition group-hover:block  ml-2 absolute lg:top-[30%] lg:left-[27%] top-[30%] left-[27%] text-center text-5xl text-white" ><MdPlayCircleOutline /></span>
                            </div>
                            <div className=" w-[8rem]  overflow-hidden flex items-center  lg:mt-0 mt-2">
                            </div>
                        </div>
                    )
               })
           }
            </div>
        </div>
        <div className="absolute top-[41%] left-[5%] z-10 text-[red] text-[4rem] transition-all duration-150 hover:scale-105">
            <DoubleLeftOutlined onClick={sliderLeft}/>
        </div>
        <div className="absolute top-[41%] right-[5%] z-10 text-[red] text-[4rem] transition-all duration-150 hover:scale-105">
            <DoubleRightOutlined onClick={sliderRight}/>
        </div>
        </>
    );
}

export default GlassMorph;
