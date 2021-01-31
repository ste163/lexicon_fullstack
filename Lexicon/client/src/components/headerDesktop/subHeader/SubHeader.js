import React from "react"
import { ManageCollections, ManageProjects } from '../../buttons/Buttons'
import { DropDown } from '../../inputs/Inputs'
import "./SubHeader.css"

const SubHeader = () => {
    // Default Selection currently is not being checked. Need a useEffect for this.
    // const defaultSelection = +sessionStorage.getItem("defaultCollection")

    // const { collections, selectedCollection, setSelectedCollection } = useContext(CollectionContext)

    // Set currently selected collection state
    // const selectCollection = e => {
    //     const foundSelectedCollection = collections.find(collection => collection.id === +e.target.value)
    //     setSelectedCollection(foundSelectedCollection)
    // }

    return (
        <section className="view__subHeader">
            <ManageCollections isMobile={false} />
            <ManageProjects isMobile={false} />

            <div className="line__vertical"></div>

            <DropDown nameOf='collection' fieldsetLocation='subHeader__fieldset' labelIdName='collectionSelect'/>
            <DropDown nameOf='project' fieldsetLocation='subHeader__fieldset' labelIdName='projectSelect'/>
        </section>
    )
}

export default SubHeader