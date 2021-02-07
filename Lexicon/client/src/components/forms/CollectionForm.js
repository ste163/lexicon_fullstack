import React, { useContext, useState, useEffect } from "react"
import { CollectionContext } from '../../providers/CollectionProvider'
import { ProjectContext } from '../../providers/ProjectProvider'
import { CollectionManagerRoute } from '../../utils/Routes'
import { removeDuplicationFromArray, moveSingleItemsBetweenStateArrays } from '../../utils/ArrayHelpers'
import { AddableButton } from "../buttons/Buttons"
import './CollectionForm.css'
import './Form.css'

const CollectionForm = ({ history, itemToEdit }) => {
    const userId = +sessionStorage.getItem("currentUserId")
    const { collections, addCollection, updateCollection } = useContext(CollectionContext)
    const { projects, getProjects } = useContext(ProjectContext)

    const [ projectsAvailableToAdd, setProjectsAvailableToAdd ] = useState([])
    const [ projectsAdded, setProjectsAdded ] = useState([])

    // Set the default project so the form can reset.
    const defaultCollection = {
        userId: userId,
        name: '',
        description: '',
    } 
    
    // Sets state for creating the collection
    const [ currentCollection, setCurrentCollection] = useState(defaultCollection)
    // Used for showing loading indicator and locking form from multiple submits
    const [ isLoading, setIsLoading ] = useState(true)

    // Check on load and when collections change, if we have an editable collection or not
    useEffect(() => {
        // if projects is not undefined, update state
        if (projects) {
            setProjectsAvailableToAdd(projects)
        }
        // reset added state on load
        setProjectsAdded([])
        // check user's options if they're editing
        if (itemToEdit) {
            setCurrentCollection(itemToEdit.collection)
            // Get projects to display
            const projsInCol = itemToEdit.projectCollections.map(pc => pc.project)
            const projsWithDuplication = [...projects]
            projsInCol.forEach(p => projsWithDuplication.push(p))

            // Filter out duplication
            const removedDuplication = removeDuplicationFromArray(projsWithDuplication)
            
            setProjectsAdded(projsInCol)
            setProjectsAvailableToAdd(removedDuplication)
            setIsLoading(false);
        } else {
            setIsLoading(false)
        }
    }, [collections, projects])

    useEffect(() => {
        getProjects()
    }, [])

    const handleControlledInputChange = e => {
        const newCollection = { ...currentCollection }
        newCollection[e.target.name] = e.target.value
        setCurrentCollection(newCollection)
    }

    const constructNewCollection = () => {
        if (itemToEdit) {
            const collection = {
                id: itemToEdit.collection.id,
                userId,
                name: currentCollection.name,
                description: currentCollection.description,
            }

            let projectCollections = []

            // If the user added projects, create the array for view model
            if (projectsAdded.length > 0) {
                projectCollections = projectsAdded.map(p => {
                    return {
                        projectId: p.id,
                        collectionId: itemToEdit.collection.id
                    }
                })
            }

            updateCollection({
                collection, projectCollections
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
            const collection  = {
                userId,
                name: currentCollection.name,
                description: currentCollection.description,
            }

            let projectCollections = []

            // If the user added projects, create the array for view model
            if (projectsAdded.length > 0) {
                projectCollections = projectsAdded.map(p => {
                    return {
                        projectId: p.id,
                        collectionId: p.collectionId = 0
                    }
                })
            }
            
            addCollection({
                collection, projectCollections
            })
            .then(() => {
                setIsLoading(false)
                // Resets form
                setCurrentCollection(defaultCollection) 
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

    return (
        <form
            className={itemToEdit ? "" : "collection__form card card__form card__color--brightWhite"}
            onSubmit={createCollection}>

            <h3>
                {itemToEdit ? `Edit ${itemToEdit.collection.name}` : "Create"}
            </h3> 

            <fieldset>
                <label htmlFor="collectionName">Name: </label>
                <input type="text"
                    className="collection__input"
                    onChange={handleControlledInputChange}
                    id="collectionName"
                    name="name"
                    value={currentCollection.name}
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
                    value={currentCollection.description}
                    placeholder="Collection description"
                    maxLength={255} />
            </fieldset>

            <label>Projects available to link to this collection:</label>
            <ul className="form__addable-btns">
                {projectsAvailableToAdd.length === 0 ? (
                    <p className="form__p">Added all available projects. Click a collection's name to remove.</p>
                ) : (
                    projectsAvailableToAdd.map(p => <AddableButton
                        key={p.id}
                        item={p}
                        onClickFunction={moveSingleItemsBetweenStateArrays}
                        itemsAvailableStateArray={projectsAvailableToAdd}
                        setItemsAvailableStateArray={setProjectsAvailableToAdd}
                        itemsAddedState={projectsAdded}
                        setItemsAddedToStateArray={setProjectsAdded} />)
                )}
            </ul>

            <label>Linked projects:</label>
            <ul className="form__addable-btns">
                {projectsAdded.length === 0 ? (
                    <p className="form__p">None. Click a project's name to add.</p>
                ) : (
                    projectsAdded.map(p => <AddableButton
                        key={p.id}
                        item={p}
                        onClickFunction={moveSingleItemsBetweenStateArrays}
                        itemsAvailableStateArray={projectsAdded}
                        setItemsAvailableStateArray={setProjectsAdded}
                        itemsAddedState={projectsAdded}
                        setItemsAddedToStateArray={setProjectsAvailableToAdd} />)
                )}
            </ul>

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
                        {itemToEdit ? "Save" : "Create"}
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