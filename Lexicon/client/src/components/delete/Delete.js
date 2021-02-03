import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DeleteContext } from '../../providers/DeleteProvider'
import Modal from '../modal/Modal'
import './Delete.css'

const Delete = () => {
    const history = useHistory()
    const { objectToDelete, isDeleteModalOpen } = useContext(DeleteContext)

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
                    onClick={() => console.log("history.goBack!")}>
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