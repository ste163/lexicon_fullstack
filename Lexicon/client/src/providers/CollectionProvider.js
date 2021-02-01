import React, { createContext, useState, useContext } from 'react'
import { UserContext } from "./UserProvider"
import { toast } from 'react-toastify'
import { DbNoConnection, CollectionRetrieveFailure, CollectionAddFailure } from '../utils/ToastMessages'

export const CollectionContext = createContext()

export const CollectionProvider = props => {
    const apiUrl = "/api/collection"
    const currentUserId = +sessionStorage.getItem('currentUserId') // If 0, then anonymous, do not allow user to do anything
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
      if (currentUserId !== 0) {
        return getToken().then(token =>
          fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if (res.status === 500) {
              toast.error(DbNoConnection())
            }
            if (res.status === 404) {
              toast.error(CollectionRetrieveFailure())
            }
            return res.json()
          })
          .then(c => setCollections(c)))
      }
    }

    const addCollection = submittedCollection => {
      if (currentUserId !== 0) {
        return getToken().then(token => 
          fetch(apiUrl, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(submittedCollection)
          }))
          .then(res => {
            debugger
            // CHECK RESPONSE AND SAY STUFF
            if (res.status === 200) {
              return res.json()
            }
            if (res.status === 500) {
              toast.error(DbNoConnection())
              return
            }
            if (res.status === 404) {
              toast.error(CollectionAddFailure())
              return
            }      
          })
          .then(collection => {
            if (collection) {
              // push to to the main collection manager
            } else {
              return
            }
          })
      }
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

                getCollections,
                addCollection
            }}>
                {props.children}
        </CollectionContext.Provider>
    )
}