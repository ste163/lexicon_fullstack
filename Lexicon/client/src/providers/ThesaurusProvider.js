import React, { useState, createContext } from "react"

export const ThesaurusContext = createContext()

export const ThesaurusProvider = props => {
    const APIKey = process.env.REACT_APP_MW_THESAURUS_API_KEY

    const [ word, setWord ] = useState()
    const [ definitionCards, setDefinitionCards ] = useState([])

    const getWord = term => {
        debugger
        return fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=${APIKey}`)
        .then(response => response.json())
        .then(response => {
            // Set word state and definition cards' state
            // If I want to set a max card amount from user settings, will need to add that check here
            setWord(response)
            // Must use spread operator to add the array of responses to state. Cannot use push as that mutates the data.
            // State is immutable, but the spread operator returns a copy, so it doesn't mutate the data.
            setDefinitionCards(definitionCards => [ response, ...definitionCards ])
        })
    }

    return (
        <ThesaurusContext.Provider value={{
            word,
            getWord,
            definitionCards,
            setDefinitionCards
        }}>
            {props.children}
        </ThesaurusContext.Provider>
    )
}