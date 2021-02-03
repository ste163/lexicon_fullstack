import React, { useState, createContext } from 'react'
// Because of house I constructed the Managers, it would be too difficult to pass the
// setDeletedObject state throughout the MainView. This provider allows for the global state to change anywhere.

export const DeleteContext = createContext()

export const DeleteProvider = props => {
    const [objectToDelete, setObjectToDelete] = useState({})
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({})

    return (
        <DeleteContext.Provider
            value={{
                objectToDelete,
                setObjectToDelete,
                isDeleteModalOpen,
                setIsDeleteModalOpen
            }}>
            {props.children}
        </DeleteContext.Provider>
    )
}
