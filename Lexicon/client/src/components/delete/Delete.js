import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../../providers/UserProvider'
import { DeleteContext } from '../../providers/DeleteProvider'
import { CollectionManagerString, CollectionManagerRoute } from '../../utils/Routes'
import { DeleteSuccessful, DeleteFailure } from '../../utils/ToastMessages'
import Modal from '../modal/Modal'
import './Delete.css'

const Delete = () => {
    const history = useHistory()
    const location = useLocation()
    const { getToken } = useContext(UserContext)
    const { objectToDelete, setObjectToDelete, isDeleteModalOpen, setIsDeleteModalOpen } = useContext(DeleteContext)

    // Create the delete fetch here, instead of a provider. It will only ever be used here.
    const deleteCollection = (collectionId) => {
        getToken().then(token => 
            fetch(`/api/collection/${collectionId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then(res => {
              if (res.status === 204) {
                setIsDeleteModalOpen(false)
                setObjectToDelete(undefined)
                toast.info(DeleteSuccessful(objectToDelete.name))
                history.push(CollectionManagerRoute())
              } else {
                toast.error(DeleteFailure("collection"))
              }
            }))
    } 

    // Would probably be better to pull
    const possibleDeleteRoutes = [CollectionManagerString()]

    const deleteItem = () => {
        const currentUrl = location.pathname
        // Find which path from the array of possibleDeleteRoutes is the current url
        const currentDeletePath = possibleDeleteRoutes.find(r => currentUrl.match(r))

        // Decide which delete function to call
        switch (currentDeletePath) {
            case CollectionManagerString():
                deleteCollection(objectToDelete.id)
                break
        }
    }

    const deleteContent = () => (
        !objectToDelete ? (
            <div className="spinner__center">
                <div className="cls-spinner">
                    <div className="cls-circle cls-spin"></div>
                </div>
            </div>
        ) : (  
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
                            setObjectToDelete(undefined)
                            }}>
                        Cancel
                    </button>
                </div>
            </>
        )
    )

    return (
        <Modal
            contentFunction={deleteContent()}
            contentHeader={"Delete"}
            isOpen={isDeleteModalOpen} />
    )
}

export default Delete