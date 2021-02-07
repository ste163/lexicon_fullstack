import React from 'react'  
import Header from './header/Header'
import SubHeader from './subHeader/SubHeader'

const HeaderDesktop = ({
    setIsListColumnActive,
    selectedCollection,
    selectedProject,
    setSelectedProject,
    appSelectedRoute,
    history,
    projects,
    collections }) => (
    <>
        <Header />
        <SubHeader
            setIsListColumnActive={setIsListColumnActive}
            selectedCollection={selectedCollection}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            appSelectedRoute={appSelectedRoute}
            history={history}
            projects={projects}
            collections={collections} />
    </>
)

export default HeaderDesktop