import React from 'react'
import Header from '../../components/header/Header'
import SubHeader from '../../components/subHeader/SubHeader'
import Footer from '../../components/footer/Footer'
import './MainView.css'

const MainView = () => {

    // Need to track the state of List, Selected, and Thesaurus Columns
    // Based on if they are "True" display their columns. If not, display: none
    // Will also need to turn them on and off based on Screen Width. Do not handle that with CSS because they could conflict

    return (
        <div className="app__container">
            <div className="container__headers">
                <Header />
                <SubHeader />
            </div>
            <div className="container__inner">
                <section>
                    List Column                   
                </section>
                <section>
                    Selected Column
                </section>
                <section>
                    Thesaurus Column
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default MainView