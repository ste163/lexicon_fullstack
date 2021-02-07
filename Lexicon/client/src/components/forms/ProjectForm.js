import React, { useContext, useState, useEffect } from "react"
import { CollectionContext } from '../../providers/CollectionProvider'
import { ProjectContext } from '../../providers/ProjectProvider'
import { ProjectManagerRoute } from '../../utils/Routes'
import { removeDuplicationFromArray, moveSingleItemsBetweenStateArrays } from '../../utils/ArrayHelpers'
import { AddableButton } from "../buttons/Buttons"
import './Form.css'

const ProjectForm = ({ history, itemToEdit }) => {
    const userId = +sessionStorage.getItem("currentUserId")
    const { projects, addProject, updateProject } = useContext(ProjectContext)
    const { collections, getCollections } = useContext(CollectionContext)

    const [ collectionsAvailableToAdd, setCollectionsAvailableToAdd ] = useState([])
    const [ collectionsAdded, setCollectionsAdded ] = useState([])

    // Set the default project so the form can reset.
    const defaultProject = {
        userId: userId,
        name: '',
    } 
    
    // Sets state for creating the project
    const [ currentProject, setCurrentProject ] = useState(defaultProject)
    // Used for showing loading indicator and locking form from multiple submits
    const [ isLoading, setIsLoading ] = useState(true)

    // Check on load and when projects change, if we have an editable Project or not
    useEffect(() => {
        // collections  is not undefined, update state
        if (collections) {
            setCollectionsAvailableToAdd(collections)
        }
        // reset added state on load
        setCollectionsAdded([])
        // check user's options if they're editing
        if (itemToEdit) {
            setCurrentProject(itemToEdit.project)
            // get collections to display
            const collsInProj = itemToEdit.projectCollections.map(pc => pc.collection)
            const collsWithDuplication = [...projects]
            collsInProj.forEach(c => collsWithDuplication.push(c))
            
            // Filter out duplication
            const removedDuplication = removeDuplicationFromArray(collsWithDuplication)

            setCollectionsAdded(collsInProj)
            setCollectionsAvailableToAdd(removedDuplication)
            setIsLoading(false);
        } else {
            setIsLoading(false)
        }
    }, [projects, collections])

    useEffect(() => {
        getCollections()
    }, [])

    const handleControlledInputChange = e => {
        const newProject = { ...currentProject }
        newProject[e.target.name] = e.target.value
        setCurrentProject(newProject)
    }

    const constructNewProject = () => {
        if (itemToEdit) {
            const project = {
                id: itemToEdit.id,
                userId,
                name: currentProject.name,
                description: currentProject.description,
            }

            let projectCollections = []

            // If the user added projects, create the array for view model
            if (collectionsAdded.length > 0) {
                projectCollections = collectionsAdded.map(c => {
                    return {
                        projectId: itemToEdit.project.id,
                        collectionId: c.id
                    }
                })
            }

            updateProject({
                project, projectCollections
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
            const project = {
                userId,
                name: currentProject.name,
                description: currentProject.description,
            }

            let projectCollections = []

            // If the user added projects, create the array for view model
            if (collectionsAdded.length > 0) {
                projectCollections = collectionsAdded.map(c => {
                    return {
                        projectId: 0,
                        collectionId: c.id
                    }
                })
            }

            addProject({
                project, projectCollections
            })
            .then(() => {
                setIsLoading(false)
                // Resets form
                setCurrentProject(defaultProject) 
                // Push us back to the project-manager
                history.push(ProjectManagerRoute())
            })
        }
    }  

    const createProject = (e) => {
        setIsLoading(true)
        e.preventDefault()
        constructNewProject()
    }

    return (
    <form
        className={itemToEdit ? "" : "collection__form card card__form card__color--brightWhite"}
        onSubmit={createProject}>

        <h3>
            {itemToEdit ? `Edit ${itemToEdit.name}` : "Create"}
        </h3> 

        <fieldset>
            <label htmlFor="ProjectName">Name: </label>
            <input type="text"
                className="collection__input"
                onChange={handleControlledInputChange}
                id="projectName"
                name="name"
                value={currentProject.name}
                placeholder="Project name"
                maxLength={255}
                required
                autoFocus/>
        </fieldset>

        <label>Collections available to link to this project:</label>
            <ul className="form__addable-btns">
                {collectionsAvailableToAdd.length === 0 ? (
                    <p className="form__p">Added all available projects. Click a collection's name to remove.</p>
                ) : (
                    collectionsAvailableToAdd.map(p => <AddableButton
                        key={p.id}
                        item={p}
                        onClickFunction={moveSingleItemsBetweenStateArrays}
                        itemsAvailableStateArray={collectionsAvailableToAdd}
                        setItemsAvailableStateArray={setCollectionsAvailableToAdd}
                        itemsAddedState={collectionsAdded}
                        setItemsAddedToStateArray={setCollectionsAdded} />)
                )}
            </ul>

            <label>Linked collections:</label>
            <ul className="form__addable-btns">
                {collectionsAdded.length === 0 ? (
                    <p className="form__p">None. Click a project's name to add.</p>
                ) : (
                    collectionsAdded.map(p => <AddableButton
                        key={p.id}
                        item={p}
                        onClickFunction={moveSingleItemsBetweenStateArrays}
                        itemsAvailableStateArray={collectionsAdded}
                        setItemsAvailableStateArray={setCollectionsAdded}
                        itemsAddedState={collectionsAdded}
                        setItemsAddedToStateArray={setCollectionsAvailableToAdd} />)
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

export default ProjectForm