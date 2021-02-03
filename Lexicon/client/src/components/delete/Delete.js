import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DeleteContext } from '../../providers/DeleteProvider'
import Modal from '../modal/Modal'
import './Delete.css'

const Delete = () => {
    const history = useHistory()
    const { objectToDelete, isDeleteModalOpen, setIsDeleteModalOpen } = useContext(DeleteContext)

    // To handle correct delete method: pass in a Delete from state -- least work, but I'd have to remember to pass it in. Not a biggie
    // OR grab the URL at the /collection-manager, /word, /settings, etc. and run the correct method here. -- most work, but would be most dynamic

    const deleteContent = () => (
        <>
            <h2 className="modal__h2 modal__warning">Warning!</h2>
            <p className="warning__p">Deleting <span className="bold">{objectToDelete.name}</span> is <span className="bold">permanent</span>.</p>
            <p className="warning__p">Are you sure you wish to proceed?</p>
            <div className="delete__btns">
                <button
                    className="btn btn--red btn--delete"
                    onClick={() => console.log("DELETE ME")}>
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