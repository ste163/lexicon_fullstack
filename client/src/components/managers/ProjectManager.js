import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ProjectManagerCreateRoute, ProjectManagerRoute } from '../../utils/Routes'
import { ProjectContext } from '../../providers/ProjectProvider'
import { CollectionContext } from '../../providers/CollectionProvider'
import { ManagerArrow } from '../buttons/Buttons'
import DetailsContainer from '../details/DetailsContainer'
import ListControls from '../../components/lists/ListControls'
import ListCardContainer from '../lists/ListCardContainer'
import ProjectForm from '../forms/ProjectForm'
import './Manager.css'
import {
    AppSelectedRoute,
    ProjectManagerDetailsRoute,
    ProjectManagerEditRoute,
    ProjectManagerDeleteRoute
} from '../../utils/Routes'

const ProjectManager = () => {
    const history = useHistory()
    const {
        projects,
        selectedProject,
        isFetchingProjects,
        isFetchingProjectDetails,
        isProjectCreateFormOpen,
        isProjectDetailsOpen,
        isProjectEditFormOpen
    } = useContext(ProjectContext)

    const { collections, selectedCollection, setSelectedCollection } = useContext(CollectionContext)

    const [searchTerms, setSearchTerms] = useState("")
    const [filteredList, setFilteredList] = useState([])

    // handles searching
    useEffect(() => {
        if (searchTerms !== "") {
            const matches = projects.filter(c => c.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFilteredList(matches)
        } else {
            // no terms in search bar, so display all and reset filtered items
            setFilteredList(projects)
        }
    }, [searchTerms, projects])
    
    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">
            <DetailsContainer
                history={history}
                isCollections={false}
                selectedItem={selectedProject}
                isFetching={isFetchingProjectDetails}
                isDetailsOpen={isProjectDetailsOpen}
                isEditFormOpen={isProjectEditFormOpen}
                itemToEdit={selectedProject}
                EditForm={ProjectForm}
                managerUrlToPushTo={ProjectManagerRoute}
                selectedUrlToPushTo={AppSelectedRoute}
                editUrlToPushTo={ProjectManagerEditRoute}
                deleteUrlToPushTo={ProjectManagerDeleteRoute} />

            <section 
                // Will need to have checking on is the form open or details OR edit
                className={isProjectCreateFormOpen ? (
                    "manager__list manager__list--inactive--form"
                    ) : isProjectDetailsOpen ? (
                        "manager__list manager__list--inactive--details"
                    ) : (
                        "manager__list"
                    )}>
                <ListControls
                    history={history}
                    // Must refactor drop-downs to get filtering working
                    // projects={collections}
                    // setSelectedProject={setSelectedCollection}
                    // selectedProject={selectedCollection}
                    searchLabelTitle={"Search projects"}
                    searchPlaceholderText={"Enter a name..."}
                    setSearchTerms={setSearchTerms}
                    formUrlToPushTo={ProjectManagerCreateRoute}
                    createNewString={"project"} />

                <ListCardContainer
                    history={history}
                    urlToPushTo={ProjectManagerDetailsRoute}
                    isFetching={isFetchingProjects}
                    searchTerms={searchTerms}
                    items={filteredList}  />
            </section>

            <section
                className={isProjectCreateFormOpen ? (
                    "manager__form manager__form--active"
                    ) : (
                    "manager__form"
                )}>

                <ManagerArrow
                    isForm={true}
                    managerUrlToPushTo={ProjectManagerRoute}
                    history={history} />

                <ProjectForm
                    history={history} />
            </section>
        </section>
    )
}

export default ProjectManager