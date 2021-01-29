import React from 'react'
import Header from '../../components/header/Header'
import SubHeader from '../../components/subHeader/SubHeader'
import Footer from '../../components/footer/Footer'

const MainView = () => {

    return (
        <div className="app__container">   
            <Header />
            <SubHeader />
            <div>CONTENT</div>
            <Footer />
        </div>            
    )
}

export default MainView