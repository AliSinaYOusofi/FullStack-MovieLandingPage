import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {AiOutlineClose, AiOutlinePlus} from 'react-icons/ai';
import ScrollTrigger  from 'gsap/dist/ScrollTrigger';
import {Back, Power1} from 'gsap';

const FAQ = ({question, details}) => {

    const netflix = useRef();
    
    let parentDiv = useRef();
    let headerRef = useRef();

    const [display, setDisplay] = useState(false);
    
    const handleClick = () => {
        setDisplay(!display);
        !display ? netflix.current.style.display="inline": netflix.current.style.display="none";
    };

    let counter = 0;  
    gsap.registerPlugin(ScrollTrigger);

    useEffect( () => {
        ++counter;
        if (counter === 1) {
            gsap.from(parentDiv, {
                scrollTrigger: {
                    trigger: parentDiv,
                    toggleActions: "play play play pause",
                    start: "-350px 40%",
                    end: "bottom 80%",
                    scrub: true,
                },
                x: 0,
                opacity: 0,
                duration: 1,
                ease: Power1,
                stagger: 0.5 
            })

            gsap.from(headerRef, {
                scrollTrigger: {
                    trigger: headerRef,
                    toggleActions: "restart play play pause",
                    
                },
                x: -200,
                opacity: 0,
                duration: 1,
                ease: Power1,
                stagger: 0.5 
            })
            return;
        }
        return;
    })
    
    return (

        <div ref={el => parentDiv = el}  className="w-full lg:w-2/3 mx-auto mt-1  text-white transition delay-100 duration-150 pl-2 pr-6 lg:p-0
        ">
            <div className="bg-gr  text-center flex flex-col cursor-pointer lg:px-5 py-5 mt-4 " onClick={() => { handleClick();}} style={{background: "rgb(48, 48, 48)"}}>
               
               <div    className="w-full  flex justify-between items-center t">
                <h1 ref={el => headerRef = el} className="lg:text-2xl text-sm  ml-2 lg:ml-0 font-bold"> {question}</h1>
                {
                    display 
                     ? <AiOutlineClose className="mr-5 lg:mr-0 lg:text-4xl text-xl group"/> 
                     : <AiOutlinePlus className="mr-5 lg:mr-0 lg:text-4xl text-xl group"/> 
                }
               </div>
              
               <div className="move w-full px-6 py-2 hidden text-start transition delay-150 duration-700" ref={netflix}>
               <hr />
                <p className="lg:text-2xl text-sm">{details}</p>
               </div>
            </div>
        </div>
    );
}

export default FAQ