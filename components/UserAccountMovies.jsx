import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap, { Back } from 'gsap';
import endPoints from '../requests/api';
import "../font.css"
const UserAccountMovies = () => {
    
    let image = useRef();
    let title = useRef();
    let year = useRef();
    let overview = useRef();
    let watch = useRef();
    let trailer = useRef();
    
    const [movies, setMovies] = useState([]);
    const text = movies[Math.floor(Math.random() * movies.length)];
    
    let counter = 0;

    useEffect( () => {
        const getAsyncData = async () => {
            ++counter;
            try {
                const response = await axios.get(endPoints.requestUpcomping);
                setMovies(response.data.results);
            }
            catch( error) { 
                console.log(error)
            };       
        }
        getAsyncData();
        move();
    }, []);

    const timeline = gsap.timeline();
    const move =  () => {
        if (counter === 1) {

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
       <div className="absolute w-full  top-0 text-white">
            <div className="w-full h-full">
                <div className="absolute top-0 bg-gradient-to-t  from-black/100 w-full h-full"></div>
                <img ref={el => image = el} className="w-full z z-50 h-screen e object-cover " src={`https://image.tmdb.org/t/p/w1280/${text?.backdrop_path}`} alt={text?.title} />
                <div className="op  absolute top-0 bg-gradient-to-b  from-black/100 w-full h-full"></div>

            </div>

            <div className="about absolute top-[20%] left-[2rem]">
                <div>
                    <h1 ref={el => title = el} className="title text-[2rem] text-gray-300"> {text?.original_title}</h1>
                    <h2 ref={el => year = el} className="text-gray-300 text-[1.5rem]"> {text?.release_date}</h2>
                    
                    <div className="over w-[80%] lg:w-[60%]">

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
       </div>
    );
}

export default UserAccountMovies;
