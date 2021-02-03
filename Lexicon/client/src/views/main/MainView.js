import React, { useState, useEffect, useContext } from 'react'
import { CollectionContext } from '../../providers/CollectionProvider'
import Delete from '../../components/delete/Delete'
import HeaderDesktop from '../../components/headerDesktop/HeaderDesktop'
import HeaderMobile from '../../components/headerMobile/HeaderMobile'
import Footer from '../../components/footer/Footer'
import './MainView.css'

const MainView = () => {
    const { getCollections } = useContext(CollectionContext)

    // Track browser windows dimensions, so if they are below a certain amount, swap to mobile-view header
    const [ windowDimensions, setWindowDimensions ] = useState({ height: window.innerHeight, width: window.innerWidth })
    // isMobile tracks state for if we should show mobile view or not
    const [ isMobile, setIsMobile ] = useState(false)
    // If you change this, update it in: Icons.css, 
    const maxWidthForMobile = 924
    
    // Need to track the state of List, Selected, and Thesaurus Columns
    // Based on if they are "True" display their columns. If not, display: none
    // Will also need to turn them on and off based on Screen Width. Do not handle that with CSS because they could conflict

    useEffect(() => {
        getCollections()
    }, [])

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

    // Delays state update on every resize event, and removes the event listener to stop a memory leak
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setWindowDimensions({
              height: window.innerHeight,
              width: window.innerWidth
            })
          }, 150)

        // EventListener on Window object to properly track the current browser dimensions
        window.addEventListener('resize', debouncedHandleResize)
        console.log(windowDimensions)

        if (windowDimensions.width < maxWidthForMobile){
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        // Remove event listener so we don't add an infinite amount
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [windowDimensions])


    return (
        <div className="app__container">
            {/* Delete renders a hidden modal accessible only by delete routes */}
            <Delete />

            <div className="container__headers">
                {isMobile ? (
                    <HeaderMobile />
                ) : (
                    <HeaderDesktop />
                )}
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