import React, { useContext } from 'react'
import { ThesaurusContext } from '../../../providers/ThesaurusProvider'
import DefinitionCard from '../../../components/definitions/DefinitionCard'
import DefinitionSimilar from '../../../components/definitions/DefinitionSimilar'
import DefinitionNotFound from '../../../components/definitions/DefinitionNotFound'
import ThesaurusSearch from './ThesaurusSearch'
import './Thesaurus.css'

// Thesaurus Column works by mapping over each definitionCard created by clicking the search or word buttons
const ThesaurusColumn = () => {
    const { definitionCards, setDefinitionCards } = useContext(ThesaurusContext)
    const { getWordFromThesaurus } = useContext(ThesaurusContext)

    return (
        <>
            <ThesaurusSearch getWordFromThesaurus={getWordFromThesaurus} />

            {definitionCards.map(dc => {

                // create the key based on current items index
                const key = definitionCards.indexOf(dc)
                // Check current def card to choose which to display
                if (typeof dc[0] !== "string" && dc[0] !== undefined) {
                    return <DefinitionCard
                            key={key}
                            cardId={key}
                            getWordFromThesaurus={getWordFromThesaurus}
                            definitions={dc} />
                } else if (dc[0] !== undefined) {
                    // Return similar words to the term
                    return <DefinitionSimilar
                                key={key}
                                cardId={key} 
                                getWordFromThesaurus={getWordFromThesaurus}
                                definitions={dc}
                                definitionCards={definitionCards}
                                setDefinitionCards={setDefinitionCards} />
                } else {
                    return <DefinitionNotFound
                        key={key}
                        cardId={key}
                        definitionCards={definitionCards}
                        setDefinitionCards={setDefinitionCards} />
                }
            })}
        </>
    )
}

export default ThesaurusColumn