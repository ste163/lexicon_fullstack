import React, { useRef, useContext } from "react"
// import { CollectionContext } from "../../providers/CollectionProvider"
import { IconPlus } from "../icons/Icons"
import Modal from "../modal/Modal"
// import { CollectionForm } from "../forms/CollectionForm"
import "./SubHeader.css"

const SubHeader = () => {
    // Default Selection currently is not being checked. Need a useEffect for this.
    // const defaultSelection = +sessionStorage.getItem("defaultCollection")
    const modal = useRef()

    // const { collections, selectedCollection, setSelectedCollection } = useContext(CollectionContext)

    // Set currently selected collection state
    // const selectCollection = e => {
    //     const foundSelectedCollection = collections.find(collection => collection.id === +e.target.value)
    //     setSelectedCollection(foundSelectedCollection)
    // }

    return (
        <>
        {/* <Modal ref={modal} contentFunction={<CollectionForm />} contentHeader={"Collection"} /> */}

        <section className="view__subHeader">
            <button className="collection__btn"
            onClick={e => modal.current.className = "background__modal modal__active"}
            onMouseOver={e => {
                e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                    svg.classList.remove("icon__gray")
                    svg.classList.add("icon__hovered")
                })
            }}
            onMouseOut={e => {
                e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                    svg.classList.remove("icon__hovered")
                    svg.classList.add("icon__gray")
                })
            }}>
                <IconPlus color="icon__gray" />
                Create new collection
            </button>

            {/* Do not use the SVG, but the border styles CSS on a div */}
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
        </>
    )
}

export default SubHeader