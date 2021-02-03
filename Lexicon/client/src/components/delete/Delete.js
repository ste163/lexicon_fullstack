import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { DeleteContext } from '../../providers/DeleteProvider'
import { CollectionManagerString } from '../../utils/Routes'
import Modal from '../modal/Modal'
import './Delete.css'

const Delete = () => {
    const history = useHistory()
    const location = useLocation()
    const [deleteMethod, setDeleteMethod] = useState()
    const { objectToDelete, isDeleteModalOpen, setIsDeleteModalOpen } = useContext(DeleteContext)

    // 1. Get the current URL pathname
    // 2. See if the pathname matches /collection-manager, etc.
            // Get all my routes for deleting
            // SWITCH statement based on which it is
    // 3. If it matches, set the Delete Method to the correct Delete
    // 4. Fire off delete method button click
    // 5. Bring in all delete methods to wire it up

    // Would probably be better to pull
    const possibleDeleteRoutes = [CollectionManagerString()]

    const deleteItem = () => {
        const currentUrl = location.pathname
        const currentDeletePath = possibleDeleteRoutes.find(r => currentUrl.match(r))
        console.log(currentDeletePath)
    }


    const deleteContent = () => (
        <>
            <h2 className="modal__h2 modal__warning">Warning!</h2>
            <p className="warning__p">Deleting <span className="bold">{objectToDelete.name}</span> is <span className="bold">permanent</span>.</p>
            <p className="warning__p">Are you sure you wish to proceed?</p>
            <div className="delete__btns">
                <button
                    className="btn btn--red btn--delete"
                    onClick={() => deleteItem()}>
                    Delete
                </button>
                <button
                    className="btn btn--cancel"
                    onClick={() => {
                        history.goBack()
                        setIsDeleteModalOpen(false)
                        }}>
                    Cancel
                </button>
            </div>
        </>
        // name of current thing to delete
        // but the name must be based on the object type
        // because not everything has a .name property
        // Cancel and delete buttons
    )

    return (
        <Modal
            contentFunction={deleteContent()}
            contentHeader={"Delete"}
            isOpen={isDeleteModalOpen} />
    )
}

export default Delete