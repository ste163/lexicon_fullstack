import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DeleteContext } from '../../providers/DeleteProvider'
import Modal from '../modal/Modal'
import './Delete.css'

const Delete = () => {
    const history = useHistory()
    const { objectToDelete, isDeleteModalOpen } = useContext(DeleteContext)

    const deleteContent = () => (
        <div>Delete!</div>
    )

    return (
        <Modal
            contentFunction={deleteContent()}
            contentHeader={"Delete"}
            isOpen={isDeleteModalOpen} />
    )
}

export default Delete