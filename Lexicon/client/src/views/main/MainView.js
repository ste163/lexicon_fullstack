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
import SelectedCard from './selected/SelectedCard'
import ListColumn from './list/ListColumn'
import ThesaurusColumn from './thesaurus/ThesaurusColumn'
import { ThesaurusContext } from '../../providers/ThesaurusProvider'
import './MainView.css'
// Main dashboard after sign in. Pass in main collections and projects on load
// maintain state for window size to switch between desktop and mobile

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

    const { getWordFromThesaurus } = useContext(ThesaurusContext)
    // List column search state
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredList, setFilteredList] = useState([])

    // Track browser windows dimensions, so if they are below a certain amount, swap to mobile-view header
    const [ windowDimensions, setWindowDimensions ] = useState({ height: window.innerHeight, width: window.innerWidth })
    // isMobile tracks state for if we should show mobile view or not
    const [ isMobile, setIsMobile ] = useState(false)
    // If you change this, update it in: Icons.css, 
    const maxWidthForMobile = 1075

    useEffect(() => {
        getCollections()
        getProjects()
    }, [])

    // handles list column searching
    useEffect(() => {
        // turn on and off the list column toggle button
        // if (!collections || collections.length !== 0) {
        //     setIsListColumnActive(true)
        // } else {
        //     setIsListColumnActive(false)
        // }

        if (searchTerms !== "") {
            const matches = collections.filter(c => c.name.toLowerCase().includes(searchTerms.toLowerCase().trim()) || c.description.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFilteredList(matches)
        } else {
            // no terms in search bar, so display all and reset filtered items
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

        checkMobileView()

        // Remove event listener so we don't add an infinite amount
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [windowDimensions])

    const checkMobileView = () => {
        if (windowDimensions.width < maxWidthForMobile){
            setIsMobile(true)
            setIsListColumnActive(false)
        } else {
            setIsMobile(false)
            setIsListColumnActive(false)
        }
    }


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
                        appSelectedRoute={AppSelectedRoute}
                        history={history}
                        collections={collections} />
                ) : (
                    <HeaderDesktop
                        isListColumnActive={isListColumnActive}
                        setIsListColumnActive={setIsListColumnActive}
                        isSelectedColumnActive={isSelectedColumnActive}
                        setIsSelectedColumnActive={setIsSelectedColumnActive}
                        selectedCollection={selectedCollection}
                        appSelectedRoute={AppSelectedRoute}
                        history={history}
                        collections={collections}/>
                )}
            </div>
            
            {/* Dashboard */}
            <div className="container__inner">
                
                {isListColumnActive ? (
                    <section className="column__list">
                        <ListColumn
                            history={history}
                            projects={projects}
                            setSelectedProject={setSelectedProject}
                            selectedProject={selectedProject}
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
                            <SelectedCard
                                history={history}
                                selectedCollection={selectedCollection}
                                getWordFromThesaurus={getWordFromThesaurus} />
                        ) : (
                            null
                        )}
                    </section>
                ) : (
                    null
                )}
                <section className="column__thesaurus">
                    <ThesaurusColumn />
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default MainView