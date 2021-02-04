import React, { useContext, useState, useEffect } from "react"
import { ProjectContext } from '../../providers/ProjectProvider'
import { ProjectManagerRoute } from '../../utils/Routes'
import './Form.css'

const ProjectForm = ({ history, itemToEdit }) => {
    const userId = +sessionStorage.getItem("currentUserId")
    const { projects, addProject, updateProject } = useContext(ProjectContext)

    // Set the default project so the form can reset.
    const defaultProject = {
        userId: userId,
        name: '',
    } 
    
    // Sets state for creating the project
    const [ project, setProject ] = useState(defaultProject)
    // Used for showing loading indicator and locking form from multiple submits
    const [ isLoading, setIsLoading ] = useState(true)


    // Check on load and when projects change, if we have an editable Project or not
    useEffect(() => {
        if (itemToEdit) {
            setProject(itemToEdit)
            setIsLoading(false);
        } else {
            setIsLoading(false)
        }
    // }, [selectedProject, projects])
    }, [projects])

    const handleControlledInputChange = e => {
        const newProject = { ...project }
        newProject[e.target.name] = e.target.value
        setProject(newProject)
    }

    const constructNewProject = () => {
        if (itemToEdit) {
            updateProject({
                id: itemToEdit.id,
                userId,
                name: project.name,
                description: project.description,
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
            addProject({
                userId,
                name: project.name,
                description: project.description,
            })
            .then(() => {
                setIsLoading(false)
                // Resets form
                setProject(defaultProject) 
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
                value={project.name}
                placeholder="Project name"
                maxLength={255}
                required
                autoFocus/>
        </fieldset>

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