import React, { useState, createContext } from 'react'
// Because of how I constructed the Managers, it would be too difficult to pass the
// setDeletedObject state throughout the MainView. This provider allows for the global state to change anywhere.

export const DeleteContext = createContext()

export const DeleteProvider = props => {
    const [objectToDelete, setObjectToDelete] = useState(undefined)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
