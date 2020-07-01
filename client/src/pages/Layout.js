import React from 'react';

import Header from '../components/Header/Header';
import HeaderLinks from '../components/Header/HeaderLinks';
import Footer from '../components/Footer/Footer';

export default function Layout({component: Component, ...rest}){
    return(
      <div>
        <Header
          brand="Forum"
          rightLinks={<HeaderLinks/>}
          />
            <Component/>
        <Footer/>
      </div>

    )
}