import React from "react"
import { ManagerButton } from '../../buttons/Buttons'
import { DropDown } from '../../inputs/Inputs'
import { CollectionManagerRoute, ProjectManagerRoute } from '../../../utils/Routes'
import "./SubHeader.css"

const SubHeader = ({
    isSelectedColumnActive,
    setIsSelectedColumnActive,
    isListColumnActive,
    setIsListColumnActive,
    selectedCollection,
    appSelectedRoute,
    history,
    collections }) => {
    const currentUserId = +sessionStorage.getItem('currentUserId') // If 0, then anonymous, do not allow user to do anything

    return (
        <section className="view__subHeader">
            <ManagerButton
                isMobile={false}
                managerRoute={CollectionManagerRoute}
                managerBtnText={"Manage Collections"} />

            <ManagerButton
                isMobile={false}
                managerRoute={ProjectManagerRoute}
                managerBtnText={"Manage Projects"} />

            {currentUserId === 0 ? (
                null
            ) : (
                <>
                    <div className="line__vertical"></div>
        
                    <DropDown
                        nameOf='Selected collection'
                        fieldsetLocation='subHeader__fieldset'
                        labelIdName='collectionSelect'
                        isCollection={true}
                        history={history}
                        urlToPushTo={appSelectedRoute}
                        currentState={selectedCollection}
                        stateArray={collections} />
        
                    <div className="line__vertical"></div>
        
                    <label className="toggle__column" htmlFor="listColumn">Toggle List Column: </label>
        
                    <input
                        disabled={!collections || collections.length === 0 ? true : false} // Disable toggle if no collections
                        onChange={e => {setIsListColumnActive(e.currentTarget.checked)}}
                        defaultChecked={!collections || collections.length === 0 ? true : isListColumnActive} // need default checked to stop react error
                        type="checkbox"
                        id="listColumn"
                        name="listColumn"
                        value="listColumn" />
        
                    <label className="toggle__column" htmlFor="listColumn">Toggle Selected Column: </label>
                    <input
                        onChange={e => {setIsSelectedColumnActive(e.currentTarget.checked)}}
                        checked={isSelectedColumnActive}
                        type="checkbox"
                        id="listColumn"
                        name="listColumn"
                        value="listColumn" />
                </>
            )}
        </section>
    )
}

export default SubHeader