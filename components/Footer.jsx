import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="text-white mt-10   grid grid-rows2 grid-cols-2
        justify-center px-5 py-3 w-full font-mono lg:mt-20">
            
            <div className="">
                <div className="w-full ">
                    <ul className="lg:flex lg:flex-row justify-around text-xs leading-[2rem] w-full h-full flex flex-col ">
                      <div>
                        <li className=" transition w-fit decoration-solid hover:underline cursor-pointer text-gray-400">FAQ</li>
                        <li className="transition w-fit  hover:underline cursor-pointer text-gray-400"><Link to=""> Account</Link></li>
                        <li className="transition w-fit  hover:underline cursor-pointer text-gray-400 ">Investors Relations</li>
                        <li className="transition w-fit hover:underline cursor-pointer text-gray-400 ">Ways to watch</li>
                      </div>
                      <div>
                        <li className="transition w-fit  hover:underline cursor-pointer text-gray-400 ">Privacy</li>
                        <li className="transition w-fit hover:underline cursor-pointer text-gray-400 ">Corporate Information</li>
                        <li className="transition w-fit  hover:underline cursor-pointer text-gray-400 ">Speed Test</li>
                        <li className="transition w-fit  hover:underline cursor-pointer text-gray-400  ">Only on netflix</li>
                      </div>
                    </ul>
                </div>
            </div>
            <div className="">
                <div className="ml-4 w-full h-full ">
                    <ul className="text-xs leading-[2rem] lg:flex lg:flex-row justify-around">
                        <div>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Help Center</li>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Media Center</li>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Jobs</li>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Terms of use</li>
                        </div>
                        <div>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Cookie Preference</li>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Contatct Us</li>
                            <li className="transition w-fit  hover:underline cursor-pointer text-gray-400">Legal Notices</li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
