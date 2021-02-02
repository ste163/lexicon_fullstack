import React, { useContext, useState, useEffect } from "react"
import { CollectionContext } from '../../providers/CollectionProvider'
import { CollectionManagerRoute } from '../../utils/Routes'
import './CollectionForm.css'
import './Form.css'

const CollectionForm = ({ history }) => {
    const userId = +sessionStorage.getItem("currentUserId")

    // Set the default project so the form can reset.
    const defaultCollection = {
        userId: userId,
        name: '',
        description: '',
    } 

    // const { collections, selectedCollection, addCollection, updateCollection } = useContext(CollectionContext)
    const { collections, addCollection } = useContext(CollectionContext)
    
    // Sets state for creating the project
    const [ collection, setCollection ] = useState(defaultCollection)

    // WHENEVER WE HAVE isLOADING, DON'T FORGET THE LOADING INDICATOR
    const [ isLoading, setIsLoading ] = useState(true)

    // EDITABLE COLLECTION SHOULD COME FROM THE STRING QUERY PARAM
    // Check on load and when collections change, if we have an editable collection or not
    useEffect(() => {
        // if (editableCollection) {
        //     setCollection(editableCollection)
        //     setIsLoading(false);
        // } else {
            setIsLoading(false)
        // }
    // }, [selectedCollection, collections])
    }, [collections])

    const handleControlledInputChange = e => {
        const newCollection = { ...collection }
        newCollection[e.target.name] = e.target.value
        setCollection(newCollection)
    }

    const constructNewCollection = () => {
        // if (editableCollection) {
        //     updateCollection({
        //         id: editableCollection.id,
        //         userId,
        //         name: collection.name,
        //         description: collection.description,
        //     })
            // May need to re-get all WORDS here and recent words, but not sure
            // .then(() => {
            //     getProgressByCollectionId(editableCollection.id)
            // })
        // } else {
            addCollection({
                userId,
                name: collection.name,
                description: collection.description,
            })
            .then(() => {
                setIsLoading(false)
                // Resets form
                setCollection(defaultCollection) 
                // Push us back to the collection-manager
                history.push(CollectionManagerRoute())
            })
        }  

    const createCollection = (e) => {
        setIsLoading(true)
        e.preventDefault()
        constructNewCollection()
    }

    return (
    <form
        className="collection__form"
        onSubmit={createCollection}>

        <h3>
            {"Create"}
        </h3> 

        <fieldset>
            <label htmlFor="collectionName">Name: </label>
            <input type="text"
                className="collection__input"
                onChange={handleControlledInputChange}
                id="collectionName"
                name="name"
                value={collection.name}
                placeholder="Collection name"
                maxLength={255}
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
                maxLength={255}
                />
        </fieldset>

        { isLoading ? (
            <div className="spinner__card">
                <div className="cls-spinner cls-spinner--card">
                    <div className="cls-circle cls-spin"></div>
                </div>
            </div>
        ) : (
            <div className="collection__submit">
                <button 
                    className="btn"
                    type="submit"
                    disabled={isLoading}>
                    {"Create"}
                </button>
            </div>
        )}
    </form>
    )
}

export default CollectionForm