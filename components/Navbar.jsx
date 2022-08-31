import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGloablData } from '../context/GlobalData';

const Navbar = ({timeline}) => {
    
    const [{token}, ] = useGloablData();
    console.log(token);
    let header = useRef();
    let button = useRef();
    let buttonIn = useRef();
    
    let counter = 0;
    
    useEffect( () => {
        ++counter;
        if (counter === 1) {
            timeline.from(header, {x: -100, duration: 0.5, opacity: 0, ease: "back.in", stagger: 0.3});
            timeline.from(button, {x: 50, duration: .4, opacity: 0, ease: "elastic", stagger: 0.5})
            timeline.from(buttonIn, {x: 50, duration: .3, opacity: 0, ease: "elastic", stagger: 0.5})
        
            return
        }
        else {   
            return
        }
        
    }, []);

    useEffect( () => {
        async function isUserLoggedIn() {
            const response = await axios.get("http://localhost:3001/islogged");
            console.log(response);
        }
    }, [])
    return (
        <div className="navbar flex flex-row justify-between text-white w-full px-8 py-3 absolute top-2">
            <div className="header">
                <h1 ref={el => header = el} className="text-4xl text-red-700 font-bold tracking-wider -mt-3">Netflix</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-x-4 gap-x-0">
                <Link to="/login">
                    <button ref={el => buttonIn = el} className="button px-4 py-1 text-center bg-red-600/75 rounded-sm"> Sing In</button>
                </Link>
                <Link to="/signup" className="mt-2 lg:mr-0 mr-1 lg:mt-0">
                    <button ref={el => button = el} className="button px-3  lg:ml-0  py-1 text-center bg-red-600/75 rounded-sm"> Sing Up</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
