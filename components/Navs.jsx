import React,  { useEffect, useRef, useState } from "react";
import {useGloablData} from "../context/GlobalData"
import gsap from 'gsap';
import {HomeOutlined, LogoutOutlined, PlayCircleOutlined,SearchOutlined} from '@ant-design/icons'
import {GiHamburgerMenu, GiCrossMark} from 'react-icons/gi'
import { Link } from "react-router-dom";
import "../font.css"
function Navs() {
  const [{current_token}, dispatch] = useGloablData();
  
  const [menu, setMenu] = useState(false);
  const [click, setClick] = useState(false);

  let menuRef = useRef();
  
  let header = useRef();
  let button = useRef();
  let burger = useRef();
  let searchBar = useRef();
  let closeIcon = useRef();
  
  

  let counter = 0;

    useEffect( () => {
        ++counter;
        gsap.to(menuRef, {
            x: 200,
            opacity: 10,
            
            duration: 1
        });
        if (counter === 1) {
            const timeline = gsap.timeline();
            timeline.from(header, {
               
                opacity: 0,
               
            }).from(burger, {
              
                opacity: 0,
                
            }).from(button, {
              
                opacity: 0,
                
            }).from(searchBar, {
               
                opacity: 0,
               
            }).from(closeIcon, {
               
                opacity: 0,
               
            })
        }
    }, [counter]);


  const handleMenu = () => {
    setMenu(!menu);
    if (!menu) {
        const timeline = gsap.timeline();
        timeline.to(menuRef, {
            x: 0,
            duration: 0.4,
            opacity: 90,
            zIndex: 100
        }).from(".ul li", {
           y: 100,
           duration: 0.6,
           opacity: 0,
           ease: "back.in",
           stagger: 0.4
        })

    } else {
        gsap.to(menuRef, {
            x: 200,
            opacity: 0,
            duration: 0.3
        })
    }
}

    


  return (
          <div className="navbar relative  flex flex-row justify-between text-white w-full">
            <div className="header">
                <h1  className="text-[2rem] text-red-700 font-bold px-8 py-3 tracking-wider -mt-3" ref={el => header = el}>Netflix</h1>
            </div>
            <div   className="w-[10rem] mr-10 overflow-hidden  flex flex-col justify-end items-end">  
                <div ref={el => burger = el} onClick={handleMenu} className="mt-4">
                    {
                        click ? <GiCrossMark className="text-[2rem] cursor-pointer " onClick={() => setClick(!click)}/> : <GiHamburgerMenu className=" cursor-pointer text-[1.8rem]" onClick={() => setClick(!click)}/>
                    }
                </div>
                <div   ref={el => menuRef = el} className="w-full z-10 relative  nav flex bg-gradient-to-b  from-[#7e2626] rounded-md items-center justify-center px-3 py-5">

                    <ul className="ul notify flex flex-col gap-y-10  text-center items-center justify-cente">
                        <Link  to="/" className="transitoin-all duration-200 hover:translate-x-2">
                        <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><HomeOutlined /></span>Home</li>
                        </Link> 
                        <Link   to="/search"   className="transitoin-all duration-200 hover:translate-x-2">
                            <li   className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><SearchOutlined /></span>Search</li>
                        </Link> 
                        <Link   to="/watch"  className="transitoin-all duration-200 hover:translate-x-2">
                            <li   className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><PlayCircleOutlined /></span>Watch</li>
                        </Link> 
                        
                        { current_token === null 
                            ? 
                            <Link  to="/signup"  className="transitoin-all duration-200 hover:translate-x-2">
                                <li  className="transitoin-all duration-200 hover:translate-x-2 flex items-center justify-items-center"> <span className="mr-1 flex items-center "><LogoutOutlined /></span>SignUP</li>
                            </Link>
                            : ""
                        }  
                    </ul>
                </div>
            </div>
        
        </div>
  )
};

export default Navs;