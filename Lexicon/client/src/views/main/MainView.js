import React, { useState, useEffect} from 'react'
import HeaderDesktop from '../../components/headerDesktop/HeaderDesktop'
import Footer from '../../components/footer/Footer'
import './MainView.css'

const MainView = () => {
    // Track browser windows dimensions, so if they are below a certain amount, swap to mobile-view header
    const [ windowDimensions, setWindowDimensions ] = useState({ height: window.innerHeight, width: window.innerWidth })
    
    // Need to track the state of List, Selected, and Thesaurus Columns
    // Based on if they are "True" display their columns. If not, display: none
    // Will also need to turn them on and off based on Screen Width. Do not handle that with CSS because they could conflict

    // Debounce and useEffect based on https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
    // Debounce delays re-renders on every resize event
    function debounce(fn, ms) {
        let timer
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
      }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setWindowDimensions({
              height: window.innerHeight,
              width: window.innerWidth
            })
          }, 300)

        // EventListener on Window object to properly track the current browser dimensions
        window.addEventListener('resize', debouncedHandleResize)
        console.log(windowDimensions)

        // Remove event listener so we don't add an infinite amount
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [windowDimensions])


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