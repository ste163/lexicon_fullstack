import React, { useState, useEffect} from 'react'
import HeaderDesktop from '../../components/headerDesktop/HeaderDesktop'
import Footer from '../../components/footer/Footer'
import './MainView.css'

const MainView = () => {
    // Track browser windows dimensions, so if they are below a certain amount, swap to mobile-view header
    const [ windowDimensions, setWindowDimensions ] = useState({ height: window.innerHeight, width: window.innerWidth})
    
    // Need to track the state of List, Selected, and Thesaurus Columns
    // Based on if they are "True" display their columns. If not, display: none
    // Will also need to turn them on and off based on Screen Width. Do not handle that with CSS because they could conflict


    useEffect(() => {
        handleResize()
    }, [])

    const handleResize = () => {
        console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    }

    // EventListener on Window object to properly track the current browser dimensions
    window.addEventListener('resize', handleResize)

    return (
        <div className="app__container">
            <div className="container__headers">
                {/*
                    Need to swap-out with a Desktop view that shows both and a mobile view that shows just hamburger with top black bar.
                    Header and SubHeader need to go into a single HeaderDesktop and then a HeaderMobile
                */}
                <HeaderDesktop />
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