import React from 'react';
import Awards from './Awards';
import Statc from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Hero from './Hero';

function HomePage() {
    return ( 
        <>
         <Hero/>
        <Awards/>
        <Statc/>
        <Pricing/>
        <Education/>
        <OpenAccount/>
       
        </>
       

     );
}

export default HomePage;