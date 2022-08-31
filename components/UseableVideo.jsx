import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import {Back} from 'gsap';
const UseableVideo = ({header, paragraph, image}) => {
    
    let headerRef = useRef();
    let paragraphRef = useRef();
    let imageRef = useRef();
    
    
    let counter = 0;

  
    gsap.registerPlugin(ScrollTrigger);
    
    useEffect( () => {
        ++counter;
        if (counter === 1) {
            
            gsap.from(headerRef, {
                scrollTrigger: {
                    trigger: headerRef,
                    toggleActions: "restart play play pause",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: Back,
            });

            gsap.from(paragraphRef, {
                scrollTrigger: {
                    trigger: paragraphRef,
                    toggleActions: "restart play play pause",
                    
                },
                x: -100,
                y: 30,
                opacity: 0,
                duration: 1,
                ease: Back,
            });

            gsap.from(imageRef, {
                scrollTrigger: {
                    trigger: imageRef,
                    toggleActions: "play play play pause",
                },
                
                x: -130,
                opacity: 0,
                duration: 1,
                ease: Back,
            });

            return;
        }
        return;
    })
    return (
      <>
        <div className="font-serif tracking-wider overflow-x-hidden text-white flex flex-col gap-y-3 lg:-gap-y-10 lg:h-[500px] lg:mt-10">
            <div className="w-full h-full px-6 items-center flex flex-col
                lg:grid grid-rows-2 grid-cols-2 ">
                <div>
                    <div className="mt-3 text-center me"> <h1 ref={ref => headerRef = ref} className="first text-2xl font-bold lg:text-6xl"> {header} </h1></div>
                    <div className="w-full text-center lg:text-3xl lg:mt-4" ref={ref => paragraphRef = ref}> <p> {paragraph} </p></div>
                </div>
                <div className="lg:mt-20"> <img className="w-full h-2/3 object-contain " ref={ref => imageRef = ref} src={image} alt="" /></div>
            </div>
        </div>
    </>
    );
}

export default UseableVideo;
