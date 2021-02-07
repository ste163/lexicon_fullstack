import React from "react"
import { ManagerButton } from '../../buttons/Buttons'
import { DropDown } from '../../inputs/Inputs'
import { CollectionManagerRoute, ProjectManagerRoute } from '../../../utils/Routes'
import "./SubHeader.css"

const SubHeader = ({
    isListColumnActive,
    setIsListColumnActive,
    selectedCollection,
    selectedProject,
    setSelectedProject,
    appSelectedRoute,
    history,
    projects,
    collections }) => (
    <section className="view__subHeader">
        <ManagerButton
            isMobile={false}
            managerRoute={CollectionManagerRoute}
            managerBtnText={"Manage Collections"} />

        <ManagerButton
            isMobile={false}
            managerRoute={ProjectManagerRoute}
            managerBtnText={"Manage Projects"} />

        <div className="line__vertical"></div>

        <DropDown
            nameOf='collection'
            fieldsetLocation='subHeader__fieldset'
            labelIdName='collectionSelect'
            isCollection={true}
            history={history}
            urlToPushTo={appSelectedRoute}
            currentState={selectedCollection}
            stateArray={collections} />

        <DropDown
            nameOf='project'
            fieldsetLocation='subHeader__fieldset' 
            labelIdName='projectSelect'
            currentState={selectedProject}
            stateArray={projects}
            setCurrentState={setSelectedProject} />

        <div className="line__vertical"></div>

        <label for="listColumn">Toggle List Column: </label>
        
        <input
            onChange={e => {setIsListColumnActive(e.currentTarget.checked)}}
            checked={isListColumnActive}
            defaultChecked={true}
            type="checkbox"
            id="listColumn"
            name="listColumn"
            value="listColumn" />


    </section>
)

export default SubHeader