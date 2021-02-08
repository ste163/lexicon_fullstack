import React from 'react'
import { ManagerCreate } from '../buttons/Buttons'
import { SearchBar, DropDown } from '../inputs/Inputs'
import './ListControls.css'
// Create, Search, and Filtering for lists
// To use
    // pass in a useHistory
    // urlToPush
    // and string with 'collection' etc.

const ListControls = ({
    history,
    projects,
    setSelectedProject,
    selectedProject,
    setSearchTerms,
    formUrlToPushTo,
    createNewString }) => (
    <section className="card card__color--white card__controls">
        <ManagerCreate
            history={history} 
            formUrlToPushTo={formUrlToPushTo}
            createNewString={createNewString} />
        
        <SearchBar setSearchTerms={setSearchTerms} />

        {/* // FILTERING DOES NOT WORK YET, NEEDS RETHINKING & REFACTORING FOR NON-PROJECTS */}
        <DropDown
            nameOf='Filter by project'
            fieldsetLocation='subHeader__fieldset' 
            labelIdName='projectSelect'
            currentState={selectedProject}
            stateArray={projects}
            setCurrentState={setSelectedProject} />
        
    </section>
)

export default ListControls