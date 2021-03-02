import React from "react"
import { IconClose } from "../../components/icons/Icons"
import { WordButton } from "../../components/buttons/Buttons"
import "./DefinitionCard.css"
// Displays if there are no matches. Shows similar words

const DefinitionSimilar = ({ cardId, getWordFromThesaurus, definitions, definitionCards, setDefinitionCards }) => (
    <article className="card card__color--white card__definition">
        <button className="btn__close card__definition--close"
            onClick={e => {
                const removed = definitionCards.filter(card => definitionCards.indexOf(card) !== cardId)
                setDefinitionCards(removed)
            }}>
            <IconClose color="icon__gray" />
        </button>
        <h2 className="card__h2">Similar words</h2>    
        <h3 className="card__h3 definition__h3">Couldn't find that word. Did you mean?</h3>
        {/* word button list */}
        <ul className="word__list definition__words">
            {definitions.map(similar => <WordButton
                                            key={definitions.indexOf(similar)}
                                            word={similar}
                                            getWordFromThesaurus={getWordFromThesaurus} />)}
        </ul>
    </article>
)

export default DefinitionSimilar