import React, { useContext, useState, useEffect } from "react"
import { CollectionContext } from '../../providers/CollectionProvider'
import { ProjectContext } from '../../providers/ProjectProvider'
import { CollectionManagerRoute } from '../../utils/Routes'
import { AddableButton } from "../buttons/Buttons"
import './CollectionForm.css'
import './Form.css'

const CollectionForm = ({ history, itemToEdit }) => {
    const userId = +sessionStorage.getItem("currentUserId")
    const { collections, addCollection, updateCollection } = useContext(CollectionContext)
    const { projects } = useContext(ProjectContext)

    const [ dropdownValue, setDropdownValue ] = useState()
    const [ projectsAvailableToAdd, setProjectsAvailableToAdd ] = useState([])
    const [ projectsAdded, setProjectsAdded ] = useState([])

    // Set the default project so the form can reset.
    const defaultCollection = {
        userId: userId,
        name: '',
        description: '',
    } 
    
    // Sets state for creating the project
    const [ collection, setCollection ] = useState(defaultCollection)
    // Used for showing loading indicator and locking form from multiple submits
    const [ isLoading, setIsLoading ] = useState(true)


    // Check on load and when collections change, if we have an editable collection or not
    useEffect(() => {
        if (projects) {
            setProjectsAvailableToAdd(projects)
        }
        if (itemToEdit) {
            setCollection(itemToEdit)
            setIsLoading(false);
        } else {
            setIsLoading(false)
        }
    }, [collections])

    const removeProjectFromListAvailable = (value) => {
        // Get the ID of the item we clicked on
        // Get that item from the projectsAvailable

        // filter the projectsAvailable to Add, removing that id
        // set the filtered value to the new list available

        // make a new array of all of our projectsAdded.push(item from projectsAvailable)
        // update state with that item
    }

    const handleControlledInputChange = e => {
        const newCollection = { ...collection }
        newCollection[e.target.name] = e.target.value
        setCollection(newCollection)
    }

    const constructNewCollection = () => {
        if (itemToEdit) {
            updateCollection({
                id: itemToEdit.id,
                userId,
                name: collection.name,
                description: collection.description,
            })
            .then(res => {
                if (!res) {
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    history.goBack()
                }
            })
        } else {
            // TAKES A DIFFERENT OBJECT: a Collection and a List<ProjectCollections>
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
    }  

    const createCollection = (e) => {
        setIsLoading(true)
        e.preventDefault()
        constructNewCollection()
    }

    if (!projectsAvailableToAdd) {
        return null
    }

    return (
    <form
        className={itemToEdit ? "" : "collection__form card card__form card__color--brightWhite"}
        onSubmit={createCollection}>

        <h3>
            {itemToEdit ? `Edit ${itemToEdit.name}` : "Create"}
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

        <ul className="form__addable-btns">
            {projectsAvailableToAdd.map(p => <AddableButton key={p.id} item={p} />)}
        </ul>

        <div>
            {!projectsAdded ? (
                ""
            ) : (
                projectsAdded.map(p => "added!")
            )}
        </div>

        {isLoading ? (
            <div className="spinner__card">
                <div className="cls-spinner cls-spinner--card">
                    <div className="cls-circle cls-spin"></div>
                </div>
            </div>
        ) : (
            <div className="collection__submit">
                <button 
                    className="btn form__btn--submit"
                    type="submit"
                    disabled={isLoading}>
                    {itemToEdit ? "Edit" : "Create"}
                </button>
                {!itemToEdit ? (
                    null
                ) : (
                    <button 
                    className="btn form__btn--cancel"
                    onClick={() => {
                        history.goBack()
                    }}
                    type="button">
                    Cancel
                </button>
                ) }
            </div>
        )}
    </form>
    )
}

export default CollectionForm