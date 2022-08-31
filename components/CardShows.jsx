import React, {useEffect, useRef} from 'react';
import { Back, Elastic, Power3 } from 'gsap';
import {Link} from 'react-router-dom';

const CardShows = ({timeline}) => {
    
    let unlimited = useRef();
    let watch = useRef();
    let ready = useRef();
    let input = useRef();
    let button = useRef();
    let watchButton = useRef();

    let counter = 0;

    useEffect( () => {
        ++counter;
        if (counter === 1) {
            timeline.from(unlimited, {
                y: 200,
                opacity: 0,
                duration: 0.4,
                ease: Power3.easeInOut,
                stagger: {

                }
            });

            timeline.from(watch, {
                x: 200,
                opacity: 0,
                duration: 0.3,
                ease: Back,
            });

            timeline.from(ready, {
                y: 200,
                opacity: 0,
                duration: 0.2,
                ease: Elastic,
            });

            timeline.from(input, {
                x: -200,
                opacity: 0,
                duration: 0.1,
                ease: Elastic,
                stagger: 0.6
            });

            timeline.from(button, {
                y: 200,
                yoyo: false,
                opacity: 0,
                duration: 0.1,
                ease: Back,
            });

            timeline.from(watchButton, {
                y: 200,
                yoyo: false,
                opacity: 0,
                duration: 0.1,
                ease: Back,
            });
            return;
        }
        else {
            return;
        }
        
    })
    
    return (
      <>
        <div className="overflow-hidden absolute top-[30%] left-[20%] text-white w-2/3 
        px-3 py-4 flex flex-col gap-y-3 lg:justify-center overflow-x-hidden font-serif">
            <div className="gap-y-3 flex flex-col lg:justify-center text-center content-center text-xl">
               <div> <h1 ref={el => unlimited = el} className="md:text-5xl md:w-2/3 lg:w-full"> Unlimited movies, Tv, shows and more.</h1></div>
               <div className=" w-full"> <h3 ref={el => watch = el} className="md:text-3xl"> Watch anywhere. Cancel anytime.</h3></div>
            </div>
            <div>
                <div className="w-full text-center"> <span ref={el => ready = el} className="mg:text-2xl text lg:text-xl w-full text-center"> Ready to watch? Enter email to create or restart your membership.</span></div>
                <div className="flex flex-col lg:flex-row lg:justify-center mt-3 lg:mt-0 gap-y-2 items-center lg:gap-x-1">
                    <div><input ref={el => input = el} className="px-12 py-2 lg:py-3 text-black outline-none border-none rounded-md lg:rounded-md lg:w-[30rem] text-center" type="email" placeholder='email address' /></div>
                    <div> 
                        <div ref={el => button = el} className="bg-[red] flex flex-col items-center cursor-pointer justify-center px-2 py-2 rounded-md lg:rounded-md lg:py-3"> 
                            <span className="" > Get Started &gt;</span> 
                        </div>
                    </div>
                   
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Link to="/watch" className="px-4">
                    <button ref={el => watchButton = el} className="bg-[#cc2a2a] transition-all hover:bg-[red] w-[8rem] items-center cursor-pointer justify-center  py-2 px-3 outline-none rounded-md lg:rounded-md"> Watch </button>
                </Link>
            </div>
        </div>
        
      </>
    );
}

export default CardShows;
