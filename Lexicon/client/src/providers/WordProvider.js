import React, { useState, useContext, createContext } from "react"
import { UserContext } from "./UserProvider"
import { toast } from 'react-toastify'
import {
    AnonWarning,
    DbNoConnection,
    RetrieveFailure,
    AddFailure,
    AddSuccess,
    FailureNameDupe } from '../utils/ToastMessages'

export const WordContext = createContext()

export const WordProvider = props => {
    const objectTypeForToasts = "word"
    const apiUrl = "/api/word"
    const currentUserId = +sessionStorage.getItem('currentUserId') // If 0, then anonymous, do not allow user to do anything

    // State for words in currently selected collection
    const [ wordsInCollection, setWordsInCollection ] = useState([])
    const { getToken } = useContext(UserContext)

    const getWordsByCollectionId = collectionId => {
        if (currentUserId === 0) {
            return
        } else {
          return getToken().then(token =>
            fetch(`${apiUrl}/${collectionId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(res => {
              if (res.status === 500) {
                toast.error(DbNoConnection())
                return
              }
              if (res.status === 404) {
                toast.error(RetrieveFailure(objectTypeForToasts))
                return
              }
              return res.json()
            })
            .then(w => setWordsInCollection(w)))
        }
      }

    const addWord = word => {
        debugger
        if (currentUserId === 0) {
          toast.error(AnonWarning())
        } else {
          return getToken().then(token => 
            fetch(`${apiUrl}/${word.collectionId}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(word)
            }))
            .then(res => {
              if (res.status === 200) {
                // Working well!
                return res.json()
              }
              if (res.status === 500) {
                // Not connected to Db
                toast.error(DbNoConnection())
                return
              }
              if (res.status === 400) {
                // Bad request
                toast.error(FailureNameDupe(objectTypeForToasts))
                return
              }      
              if (res.status === 404) {
                // Not found
                toast.error(AddFailure(objectTypeForToasts))
                return
              }      
            })
            .then(collection => {
              if (collection) {
                toast.success(AddSuccess(objectTypeForToasts, word.name))
                getWordsByCollectionId(word.collectionId)
              } else {
                return
              }
            })
        }
      }

    return (
        <WordContext.Provider value={{
            wordsInCollection,
            getWordsByCollectionId,
            addWord
        }}>
            {props.children}
        </WordContext.Provider>
    )
}