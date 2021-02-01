import React, { createContext, useState, useContext } from 'react'
import { UserContext } from "./UserProvider"
import { toast } from 'react-toastify'

export const CollectionContext = createContext()

export const CollectionProvider = props => {
    const { getToken } = useContext(UserContext)
    // all collections
    const [collections, setCollections] = useState()
    // currently selected collection
    const [selectedCollection, setSelectedCollection] = useState()
    // handles open states for manager and its views
    const [isCollectionManagerOpen, setIsCollectionManagerOpen] = useState(false)
    const [isCollectionCreateFormOpen, setIsCollectionCreateFormOpen] = useState(false)
    const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false)
    const [isCollectionEditFormOpen, setIsCollectionEditFormOpen] = useState(false)
    

    const getCollections = () => {
        return getToken().then(token =>
            fetch("/api/collection", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(res => {
              if (res.status === 500) {
                toast.error("Could not connect to Lexicon's database.")
              }
              if (res.status === 404) {
                toast.error("Unable to retrieve collections.")
              }
              return res.json()
            })
            .then(c => setCollections(c)))
    }

    return (
        <CollectionContext.Provider
            value={{
                collections, setCollections,
                selectedCollection, setSelectedCollection,
                isCollectionManagerOpen, setIsCollectionManagerOpen,
                isCollectionCreateFormOpen, setIsCollectionCreateFormOpen,
                isCollectionDetailsOpen, setIsCollectionDetailsOpen,
                isCollectionEditFormOpen, setIsCollectionEditFormOpen,

                getCollections
            }}>
                {props.children}
        </CollectionContext.Provider>
    )
}