import React, { useContext, useEffect, useState } from "react"
import { ChangeIconClassOnHover } from "../../utils/ChangeIconClassOnHover"
import { ThesaurusContext } from "../../providers/ThesaurusProvider"
import { CollectionContext } from "../../providers/CollectionProvider"
import { WordContext } from "../../providers/WordProvider"
import { IconClose, IconArrow } from "../../components/icons/Icons"
import DefinitionSynonyms from './DefinitionSynonyms'
import DefinitionAntonyms from "./DefinitionAntonyms"
import "./DefinitionCard.css"
// Definition cards handle all information related to retrieved search terms

const DefinitionCard = ({ cardId, getWordFromThesaurus, definitions }) => {
    // stores incoming array of all definitions for current term
    const userId = +sessionStorage.getItem('currentUserId')

    // setState for previous and next buttons
    const [ defPrevBtnDisabled, setDefPrevBtnDisabled ] = useState(true)
    const [ defNextBtnDisabled, setDefNextBtnDisabled ] = useState(false)

    // DefinitionCards hold the array of current cards
    const { definitionCards, setDefinitionCards } = useContext(ThesaurusContext)

    const { addWord } = useContext(WordContext)

    // currentDef holds current definition showing in card. Allows for cycling through defs
    const [ currentDef, setCurrentDef ] = useState(undefined)

    // currently selected collection to add/remove definition from
    const { selectedCollection } = useContext(CollectionContext)

    // Need useEffect to setState on card instantiation
    // Whenever the definitions change (ie, a new card is added, re-load state)
    useEffect(() => {
        setCurrentDef(definitions[0])
    }, [definitions])

    // Check if the Next & Prev buttons are active
    useEffect(() => {
        // PreviousDefinitionBtn State
        if (definitions.indexOf(currentDef) === 0) {
            setDefPrevBtnDisabled(true)
        } else {
            setDefPrevBtnDisabled(false)
        }
        // NextDefinitionBtn State
        if (definitions.indexOf(currentDef) === definitions.length - 1) {
            setDefNextBtnDisabled(true)
        } else {
            setDefNextBtnDisabled(false)
        }
    }, [currentDef])

    if (!currentDef) {
        return null;
    }

    return (
        <article className="card card__color--white card__definition">

            <button className="btn__close card__definition--close"
                onClick={e => {
                    const removed = definitionCards.filter(card => definitionCards.indexOf(card) !== cardId)
                    setDefinitionCards(removed)
                }}
                onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__gray", "icon__hovered")}
                onMouseLeave={e => ChangeIconClassOnHover(e, true, "icon__hovered", "icon__gray")}>
                <IconClose color="icon__gray" />
            </button>

            <h2 className="card__h2 definition__h2">Definition</h2>
            
            {/* Display current definition name */}
            <h3 className="card__h3 definition__h3">
                {currentDef.meta.id}
            </h3>

            {/* If word is already in the user's collection, change this to REMOVE */}
            {selectedCollection === undefined || !selectedCollection.collection ? (
                    null 
                ) : (
                    <button className="btn definition__submit"
                    onClick={() => {
                        const word = {
                            userId,
                            "collectionId": selectedCollection.collection.id,
                            "MwWordId": currentDef.meta.uuid,
                            "name": currentDef.meta.id
                        }
                        addWord(word)
                    }}>
                        Add to {selectedCollection.collection.name}
                    </button>
                )}

            {
                // If more than one definition, show previous/next buttons to cycle through definitions
                definitions.length === 1 ? null :
                <div className="definition__next">
                    <button                      
                        className={definitions.indexOf(currentDef) === 0 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}
                        onClick={e => {
                            const previous = definitions.indexOf(currentDef) - 1
                            setCurrentDef(definitions[previous])
                        }}
                        onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                        onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}>
                        <IconArrow rotation="icon__arrow--rotated" color="icon__black" disabled={defPrevBtnDisabled} />
                    </button>

                    <p className="next__text"> {definitions.indexOf(currentDef) + 1} / {definitions.length}</p>
                    
                    <button
                    className={definitions.indexOf(currentDef) === definitions.length - 1 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}
                    onClick={e => {
                        const next = definitions.indexOf(currentDef) + 1
                        setCurrentDef(definitions[next])
                    }}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}>
                        <IconArrow color="icon__black" disabled={defNextBtnDisabled} />
                    </button>
                </div>
            }
            
            {/* OPEN MODAL WITH SEARCH TO MW'S DICTIONARY API FOR CURRENT DEFINITION */}
            {/* <a className="definition__expanded"
                onClick={e => {
                    console.log('FETCH INFO FROM MW DICTIONARY WITH CURRENT WORD & PART OF SPEECH, PASS INTO MODAL')
                }}>
                See Expanded Definition
            </a> */}

            {/* DEFINITION LIST SECTION */}
            <h4 className="card__h4 definition__h4--speech">
                {currentDef.fl}
            </h4>
            <ol className="definitions__list">
                {currentDef.shortdef.map(shortDefinition => (
                    <li className="list__definition" key={currentDef.shortdef.indexOf(shortDefinition)}>{shortDefinition}</li>
                ))}
            </ol>

            <DefinitionSynonyms currentDef={currentDef} getWordFromThesaurus={getWordFromThesaurus} />

            {currentDef.meta.ants.length === 0 ? (
                null
            ) : (
                <DefinitionAntonyms currentDef={currentDef} getWordFromThesaurus={getWordFromThesaurus} />
            )}

        </article>
    )
}

export default DefinitionCard