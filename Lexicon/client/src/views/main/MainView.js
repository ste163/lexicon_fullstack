import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const MainView = () => {

    return (
        <div className="app__container">   
            <Header />
        {/*
            <SubHeader />
            CONTENT COLUMNS
        */}
            <Footer />
        </div>            
    )
}

export default MainView