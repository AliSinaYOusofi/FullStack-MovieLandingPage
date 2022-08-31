import React, {useEffect, useState, useRef} from 'react';
import endPoints from '../requests/api';
import axios from 'axios';
import "../font.css";
import gsap from 'gsap';
import {Back} from 'gsap';
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import MovieCards from '../components/Trending';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Movies = ({account}) => {

    let netflix = useRef();
    let sign = useRef();
    let image = useRef();
    let title = useRef();
    let year = useRef();
    let overview = useRef();
    let watch = useRef();
    let trailer = useRef();
    
    let counter = 0;  
    gsap.registerPlugin(ScrollTrigger);

    const [movies, setMovies] = useState([]);
    const text = movies[Math.floor(Math.random() * movies.length)];
    
    
    const timeline = gsap.timeline();

    useEffect( () => {
       const getAsyncData = async () => {
            ++counter;
            try {
                const response = await axios.get(endPoints.requestPopular);
                setMovies(response.data.results);
            }
            catch( error) { 
                console.log(error)
            };       
        }
        getAsyncData();
        move();
    }, []);

    const move =  () => {
        if (counter === 1) {

            timeline.from(netflix, {
                x: -100,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });
            
            timeline.from(sign, {
                x: 100,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(title, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(year, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(overview, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(watch, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(trailer, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });

            timeline.from(image, {
                y: 110,
                opacity: 0,
                duration: .2,
                ease: Back,
                stagger: 0.4
            });
    }
}
    return (
        <div className="notify font w-full   h-[100%] text-white absolute top-0 ">
            <div className="w-full h-full">
                <div className="absolute top-0 bg-gradient-to-t  from-black/100 w-full h-full"></div>
                <img ref={el => image = el} className="w-full z z-50 h-full e object-cover " src={`https://image.tmdb.org/t/p/w1280/${text?.backdrop_path}`} alt={text?.title} />
                <div className="op  absolute top-0 bg-gradient-to-b  from-black/100 w-full h-full"></div>

            </div>
            
            <div className="notify navbar flex flex-row justify-between text-white w-full px-8 py-3 absolute top-0">
                <div className="header">
                    <h1 ref={el => netflix = el} className="text-4xl text-red-700 font-bold tracking-wider -mt-1">Netflix</h1>
                </div>
                <div>
                    <Link to="/search">
                        <button ref={el => sign = el} className="button  transition-all hover:bg-red-700 px-4 py-1 text-center bg-red-600/75 rounded-sm z-50 absolute right-8"> Search</button>
                    </Link>
                </div>
            </div>

            <div className="notify about absolute top-[20%] left-[2rem]">
                <div>
                    <h1 ref={el => title = el} className="title text-[2rem] text-gray-300"> {text?.original_title}</h1>
                    <h2 ref={el => year = el} className="text-gray-300 text-[1.5rem]"> {text?.release_date}</h2>
                    
                    <div className="w-[80%] lg:w-[60%]">

                        <h3 className="pop" ref={el => overview = el}>
                        {
                            (text?.overview)
                        } 
                        </h3>
                    </div>
                </div>
                <div className="mt-4">
                    <button ref={el => watch = el} className="border-white px-3 bg-white text-black py-2">Watch Movie</button>
                    <button ref={el => trailer = el} className="px-3 border ml-3 border-gray-300 text-white py-2 ">Watch Trailer</button>
                </div>
                
            </div>
            <div className="">
                {
                    account !== null ?
                            <div>
                                <MovieCards id="one" title={"Trending"} urlEndPoint={endPoints.requestTrending}/>
                                <MovieCards id="two" title={"Upcoming"} urlEndPoint={endPoints.requestUpcomping}/>
                                <MovieCards id="three" title={"Popular"} urlEndPoint={endPoints.requestPopular}/>
                                <MovieCards id="four" title={"Latest Tv Shows"} urlEndPoint={endPoints.requestTVPopular}/>
                            </div>
                        
                    : ""
                }
            <hr className="mt-5 w-[80%] absolute ml-10 lg:w-[90%] lg:ml-14 lg:mt-29"/>
            <Footer />
            </div>
        </div>
    );
}

export default Movies;
