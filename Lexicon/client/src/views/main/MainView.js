import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionContext } from '../../providers/CollectionProvider'
import { ProjectContext } from '../../providers/ProjectProvider'
import Delete from '../../components/delete/Delete'
import HeaderDesktop from '../../components/headerDesktop/HeaderDesktop'
import HeaderMobile from '../../components/headerMobile/HeaderMobile'
import Footer from '../../components/footer/Footer'
import Modal from '../../components/modal/Modal'
import ProjectManager from '../../components/managers/ProjectManager'
import CollectionManager from '../../components/managers/CollectionManager'
import { AppSelectedRoute } from '../../utils/Routes'
import './MainView.css'
import SelectedCard from './selected/SelectedCard'
import ListColumn from './list/ListColumn'

const MainView = ({
   isListColumnActive,
   setIsListColumnActive,
   isSelectedColumnActive,
   setIsSelectedColumnActive
}) => {
    const history = useHistory()
    const {
        collections,
        selectedCollection,
        getCollections,
        isFetchingCollections,
        isCollectionManagerOpen } = useContext(CollectionContext)
    const {
        projects,
        selectedProject,
        setSelectedProject,
        getProjects,
        isProjectManagerOpen } = useContext(ProjectContext)

    // List column search state
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredList, setFilteredList] = useState([])

    // Track browser windows dimensions, so if they are below a certain amount, swap to mobile-view header
    const [ windowDimensions, setWindowDimensions ] = useState({ height: window.innerHeight, width: window.innerWidth })
    // isMobile tracks state for if we should show mobile view or not
    const [ isMobile, setIsMobile ] = useState(false)
    // If you change this, update it in: Icons.css, 
    const maxWidthForMobile = 1350

    // Need to track the state of List, Selected, and Thesaurus Columns
    // Based on if they are "True" display their columns. If not, display: none
    // Will also need to turn them on and off based on Screen Width. Do not handle that with CSS because they could conflict

    useEffect(() => {
        getCollections()
        getProjects()
    }, [])

    // handles list column searching
    useEffect(() => {
        if (searchTerms !== "") {
            const matches = collections.filter(c => c.name.toLowerCase().includes(searchTerms.toLowerCase().trim()) || c.description.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFilteredList(matches)
        } else {
            // no terms in search bar, so diusplay all and reset filtered items
            setFilteredList(collections)
        }
        
    }, [searchTerms, collections])

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

        if (windowDimensions.width < maxWidthForMobile){
            setIsMobile(true)
            setIsListColumnActive(false)
        } else {
            setIsMobile(false)
            setIsListColumnActive(true)
        }
        console.log(windowDimensions)

        // Remove event listener so we don't add an infinite amount
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [windowDimensions])


    return (
        <div className="app__container">
            {/* Render Modals */}
            <Delete />
            
            <Modal
                isOpen={isCollectionManagerOpen}
                contentFunction={<CollectionManager />}
                contentHeader={"Collection Manager"} />

            <Modal
                isOpen={isProjectManagerOpen}
                contentFunction={<ProjectManager />}
                contentHeader={"Project Manager"} />

            {/* Headers */}
            <div className="container__headers">
                {isMobile ? (
                    <HeaderMobile
                        selectedCollection={selectedCollection}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        appSelectedRoute={AppSelectedRoute}
                        history={history}
                        projects={projects}
                        collections={collections} />
                ) : (
                    <HeaderDesktop
                        isListColumnActive={isListColumnActive}
                        setIsListColumnActive={setIsListColumnActive}
                        isSelectedColumnActive={isSelectedColumnActive}
                        setIsSelectedColumnActive={setIsSelectedColumnActive}
                        selectedCollection={selectedCollection}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        appSelectedRoute={AppSelectedRoute}
                        history={history}
                        projects={projects}
                        collections={collections}/>
                )}
            </div>
            
            {/* Dashboard */}
            <div className="container__inner">
                
                {isListColumnActive ? (
                    <section className="column__list">
                        <ListColumn
                            history={history}
                            searchTerms={searchTerms}
                            setSearchTerms={setSearchTerms}
                            AppSelectedRoute={AppSelectedRoute}
                            isFetchingCollection={isFetchingCollections}
                            collections={filteredList} />
                    </section>
                ) : (
                    null
                )}

                {isSelectedColumnActive ? (
                    <section className="column__selected">
                        {selectedCollection ? (
                            <SelectedCard selectedCollection={selectedCollection}/>
                        ) : (
                            null
                        )}
                    </section>
                ) : (
                    null
                )}
                <section className="column__thesaurus">
                    Thesaurus Column
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default MainView