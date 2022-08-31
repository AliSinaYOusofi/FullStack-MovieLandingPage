import React from 'react';
import CardShows from "../components/CardShows";
import Navbar from "../components/Navbar";
import UseableVideo from "../components/UseableVideo";
import background from '../images/large.jpg';

import kid from '../images/kid.png';
import girl from '../images/mobile-0819.jpg';
import netflix from '../images/netflix.jpg';
import FAQ from "../components/FAQ";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

import gsap from 'gsap';
const Home = () => {
    let timeline = gsap.timeline();

    return (
        <div className="w-[100vw] h-[100vh] ">
        <img 
          src={background} 
          alt=""
          className="object-cover w-full h-full 
          " 
         />
        <div className="absolute top-0 left-0 bg-gradient-to-b from-black w-full h-full" />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-black/80 w-full h-full" />
        <Navbar timeline={timeline}/>
        <CardShows timeline={timeline}/>
        <UseableVideo timeline={timeline}  image={netflix} paragraph="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more." header="Enjoy on your TV."/>
        <UseableVideo timeline={timeline} image={girl} paragraph="Save your favorites easily and always have something to watch." header="Download your shows to watch offline."/>
        <UseableVideo timeline={timeline}  image={kid} paragraph="Send kids on adventures with their favorite characters in a space made just for them—free with your membership." header="Create profiles for kids."/>
        <h1 className="text-white text-center lg:text-4xl text-2xl font-semibold my-10"> Frequently Asked Questions</h1>
        <FAQ details="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want without a single commercial all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!" question="what is Netflix"/>
        <FAQ details="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from Rs250 to Rs1,100 a month. No extra costs, no contracts." question="How much netflix cost"/>
        <FAQ details="Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere." question="Where can I watch"/>
        <FAQ details="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees start or stop your account anytime." question="When can I cancel?"/>
        <FAQ details="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want." question="What can I watch on Netflix?"/>
        <FAQ details="The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see." question="Is Netflix Good For Kids?"/>
        <NewsLetter />
        <Footer />
      </div>
    );
}

export default Home;
