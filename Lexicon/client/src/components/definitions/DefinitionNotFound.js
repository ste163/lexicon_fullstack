import React from "react"
import { IconClose } from "../../components/icons/Icons"
import "./DefinitionCard.css"
// If more than one definition in the array, show the back and next buttons 

const DefinitionNotFound = ({ cardId, definitionCards, setDefinitionCards }) => (
    <article className="card card__color--white card__definition">
        {/* Able to "close" card by removing it from array*/}
        <button className="btn__close card__definition--close"
            onClick={e => {
                const removed = definitionCards.filter(card => definitionCards.indexOf(card) !== cardId)
                setDefinitionCards(removed)
            }}>
            <IconClose color="icon__gray" />
        </button>
        <h2 className="card__h2">Error</h2>
        <h3 className="card__h3 definition__h3">Term not found.</h3>
    </article>
)

export default DefinitionNotFound