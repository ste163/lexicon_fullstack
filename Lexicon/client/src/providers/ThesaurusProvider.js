import React, { useState, createContext } from "react"
// Handles call to the thesaurus and 

export const ThesaurusContext = createContext()

export const ThesaurusProvider = props => {
    const APIKey = process.env.REACT_APP_MW_THESAURUS_API_KEY

    const [ definitionCards, setDefinitionCards ] = useState([])

    const getWordFromThesaurus = term => {
        return fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=${APIKey}`)
        .then(response => response.json())
        .then(response => {
            // If I want to set a max card amount from user settings, will need to add that check here
            // Must use spread operator to add the array of responses to state. Cannot use push as that mutates the data.
            // State is immutable, but the spread operator returns a copy, so it doesn't mutate the data.
            setDefinitionCards(definitionCards => [ response, ...definitionCards ])
        })
    }

    return (
        <ThesaurusContext.Provider value={{
            getWordFromThesaurus,
            definitionCards,
            setDefinitionCards
        }}>
            {props.children}
        </ThesaurusContext.Provider>
    )
}