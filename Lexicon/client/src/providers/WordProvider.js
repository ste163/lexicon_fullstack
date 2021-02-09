import React, { useState, createContext } from "react"

export const WordContext = createContext()

export const WordProvider = props => {

    // const userId = parseInt(sessionStorage.getItem("userId"))

    // Words are ALL the words in the database. Different from ThesaurusProvider's word state; that state is for the single word
    const [ words, setWords ] =  useState([])
    // State for words in currently selected collection
    const [ wordsInCollection, setWordsInCollection ] = useState([])

    // const getWords = userId => {
    //     return fetch(`http://localhost:8088/words/?userId=${userId}`)
    //     .then(response => response.json())
    //     .then(setWords)
    // }

    // const getWordsByCollectionId = collectionId => {
    //     return fetch(`http://localhost:8088/words/?collectionId=${collectionId}`)
    //     .then(response => response.json())
    //     .then(setWordsInCollection)
    // }

    // const addWord = word => {
    //     return fetch("http://localhost:8088/words/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(word)
    //     })
    //     .then(() => {
    //         getWords(word.userId)
    //     })
    // }

    return (
        <WordContext.Provider value={{
            words, wordsInCollection, getWords, getWordsByCollectionId, addWord
        }}>
            {props.children}
        </WordContext.Provider>
    )
}