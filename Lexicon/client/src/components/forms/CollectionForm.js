import React, { useContext, useState, useEffect } from "react"
// import { CollectionContext } from "../../providers/CollectionProvider"
import "./CollectionForm.css"

const CollectionForm = props => {

    // const editableCollection = props.props
    // const userId = +sessionStorage.getItem("userId")

    // Set the default project so the form can reset.
    // const defaultCollection = {
    //     userId: userId,
    //     name: "",
    //     description: "",
    //     // categorizationType should probably be an int
    //     categorizationType: "",
    //     starred: false
    // } 

    // const { collections, selectedCollection, addCollection, updateCollection } = useContext(CollectionContext)
    
    // Sets state for creating the project
    // const [ collection, setCollection ] = useState(defaultCollection)
    // const [ isLoading, setIsLoading ] = useState(true)

    // Check on load and when collections change, if we have an editable collection or not
    // useEffect(() => {
    //     if (editableCollection) {
    //         setCollection(editableCollection)
    //         setIsLoading(false);
    //     } else {
    //         setIsLoading(false)
    //     }
    // }, [selectedCollection, collections])

    // const handleControlledInputChange = e => {
    //     const newCollection = { ...collection }
    //     newCollection[e.target.name] = e.target.value
    //     setCollection(newCollection)
    // }

    // const constructNewCollection = (e) => {
    //     if (editableCollection) {
    //         updateCollection({
    //             id: editableCollection.id,
    //             userId,
    //             name: collection.name,
    //             description: collection.description,
    //             public: collection.public,
    //             categorizationType: collection.categorizationType,
    //             starred: collection.starred,
    //         })
    //         // May need to re-get all WORDS here and recent words, but not sure
    //         // .then(() => {
    //         //     getProgressByCollectionId(editableCollection.id)
    //         // })

    //     } else {
    //         addCollection({
    //             userId,
    //             name: collection.name,
    //             description: collection.description,
    //             public: collection.public,
    //             categorizationType: collection.categorizationType,
    //             starred: collection.starred
    //         })
    //         setCollection(defaultCollection)
    //     }  
    //         e.currentTarget.parentNode.parentNode.parentNode.className = "background__modal"
    //     }   
    // }

    const createCollection = (e) => {
        e.preventDefault()
        // constructNewCollection(e)
    }

    return (
    <form className="form__collection" onSubmit={createCollection}>
        COLLECTION FORM
        {/* <h3 className="form__h3">
            {editableCollection ? "Edit" : "Create"}
        </h3> */}

        {/* <fieldset>
            <label htmlFor="collectionName">Name: </label>
            <input type="text"
            onChange={handleControlledInputChange}
            id="collectionName"
            name="name"
            value={collection.name}
            placeholder="Collection name"
            required
            autoFocus/>
        </fieldset>

        <fieldset>
            <label htmlFor="collectionDescription">Description: </label>
            <textarea
            rows={3}
            cols={3}
            onChange={handleControlledInputChange}
            id="collectionDescription"
            name="description"
            value={collection.description}
            placeholder="Collection description"
            />
        </fieldset>
        
        <div className="collection__submit">
            <button 
            className="btn"
            type="submit"
            disabled={isLoading}>
                {editableCollection ? "Save" : "Create"}
            </button>
        </div> */}

    </form>
    )
}

export default CollectionForm