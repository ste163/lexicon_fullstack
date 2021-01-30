import React from "react"
import { CreateCollection } from '../../buttons/Buttons'
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

            <CreateCollection />
            
            <div className="line__vertical"></div>

            {/* <fieldset className="subHeader__fieldset">
                <label className="fieldset__collection" htmlFor="collectionSelect">Selected collection: </label>
                <select name="collectionSelect" id="collectionSelect"
                value={selectedCollection === undefined ? 0 : selectedCollection.id}
                onChange={e => selectCollection(e)}>
                    <option value="0">Select collection</option>
                    {
                        collections.map(c => {
                            if (c.name !== "defaultCollection") {
                                return (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            )}
                        })
                    }
                </select>
            </fieldset> */}
        </section>
    )
}

export default SubHeader