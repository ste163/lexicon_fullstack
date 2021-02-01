import React, { useContext } from "react"
import { CollectionContext } from "../../providers/CollectionProvider"
import { IconArrow } from "../icons/Icons"
import "./ListCard.css"
// Collections and Projects will display as identical list cards in their managers

const ListCard = ({collection}) => {

    // Currently do not have a selectedCollection functioning
    // const { collections, selectedCollection, setSelectedCollection } = useContext(CollectionContext)
    const { collections } = useContext(CollectionContext)
    
    const selectedCollection = undefined // for testing

    return (
        <button
        id={collection.id}
        className={
            selectedCollection === undefined ? "card card__color--white card__list btn__collection" :
            collection.id !== selectedCollection.id ? "card card__color--white card__list btn__collection" : "card card__color--yellow card__list"
        }
        onClick={e => {
            console.log("PUSH TO URL WITH ID: ", +e.target.id)
            // const matchingCollection = collections.find(collection => collection.id === +e.target.id)
            // setSelectedCollection(matchingCollection)
        }}>
            <h2 id={collection.id} className="list__h2">{collection.name}</h2>
            <p id={collection.id} className="list__p">{collection.description}</p>
            <div id={collection.id} className="list__arrow">
                <IconArrow id={collection.id} color="icon__gray" />
            </div>
        </button>
    )
}

export default ListCard