import React, { createContext, useState } from 'react'

export const CollectionContext = createContext()

export const CollectionProvider = props => {
    // all collections
    const [collections, setCollections] = useState()
    // currently selected collection
    const [selectedCollection, setSelectedCollection] = useState()
    // handles open states for manager and its views
    const [isCollectionManagerOpen, setIsCollectionManagerOpen] = useState(false)
    const [isCollectionCreateFormOpen, setIsCollectionCreateFormOpen] = useState(false)
    const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false)
    const [isCollectionEditFormOpen, setIsCollectionEditFormOpen] = useState(false)
    
    return (
        <CollectionContext.Provider
            value={{
                collections, setCollections,
                selectedCollection, setSelectedCollection,
                isCollectionManagerOpen, setIsCollectionManagerOpen,
                isCollectionCreateFormOpen, setIsCollectionCreateFormOpen,
                isCollectionDetailsOpen, setIsCollectionDetailsOpen,
                isCollectionEditFormOpen, setIsCollectionEditFormOpen
            }}>
                {props.children}
        </CollectionContext.Provider>
    )
}