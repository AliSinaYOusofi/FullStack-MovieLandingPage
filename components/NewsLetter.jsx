import React, {useEffect, useRef} from 'react';
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import {Back} from 'gsap';
import gsap from 'gsap';

const NewsLetter = () => {

    let ready = useRef();
    let input = useRef();

    let counter = 0;  
    gsap.registerPlugin(ScrollTrigger);

    useEffect( () => {
        ++counter;
        if (counter === 1) {
            gsap.from(ready, {
                scrollTrigger: {
                    trigger: ready,
                    toggleActions: "play pause resume pause",
                    scrub: 1,
                    start: "-150px 60%",
                    end: "bottom 300px",
                
                },
                x: 200,
                opacity: 0,
                duration: 1,
                ease: Back,
                stagger: 0.4
            });

            gsap.from(input, {
                scrollTrigger: {
                    trigger: input,
                    toggleActions: "play play play pause",
                    scrub: true,
                    start: "-150px 60%",
                    end: "bottom 300px",
                    
                },
                x: -200,
                opacity: 0,
                duration: 1,
                ease: Back,
                stagger: 0.4
            });

            return;
        }
        return;
    })
    return (
        <>
            <div>
                <div ref={el => ready = el} className="font-serif text-white mt-10 text-center"> <span className="mg:text-2xl text lg:text-xl w-full text-center"> Ready to watch? Enter email to create or restart your membership.</span></div>
                <div ref={el => input = el} className="flex flex-col lg:flex-row lg:justify-center mt-3 lg:mt-0 gap-y-2 items-center">
                    <div><input className="px-12 py-2 lg:mt-3 lg:py-4 text-black outline-none border-none  lg:rounded-none lg:w-[30rem]" type="email" placeholder='email address' /></div>
                    <div> 
                        <div  className="mt-3 bg-red-600 transition-all hover:bg-[red] flex items-center cursor-pointer justify-center px-2 py-1 rounded-sm lg:rounded-none lg:py-3"> 
                            <span className="lg:text-2xl text-white lg:px-6 px-1"> Get Started &gt;</span> 
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsLetter;