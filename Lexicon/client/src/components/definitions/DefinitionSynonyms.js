// Render synonyms for current definition
// Also sorts synonyms into arrays of 10
import React, { useEffect, useState } from "react"
import { ChangeIconClassOnHover } from "../../utils/ChangeIconClassOnHover"
import { IconArrow } from "../../components/icons/Icons"
import { WordButton } from "../../components/buttons/Buttons"

const DefinitionCardSynonyms = ({ currentDef }) => {

    // Couldn't use .indexOf for WordButton keys for Synonyms, so using global keyValue
    let keyValue = 0

    // Final Array of Arrays of all Synonyms separated into sets of 10
    const [ arrayOfSynonymArrays, setArrayOfSynonymArrays ] = useState([])

    // setState for previous and next buttons
    const [ synPrevBtnDisabled, setSynPrevBtnDisabled ] = useState(true)
    const [ synNextBtnDisabled, setSynNextBtnDisabled ] = useState(false)

    // Current synonymArray from array of arrays
    const [ currentSynArray, setCurrentSynArray ] = useState([])

    // Separated so we can get the current array of arrays of synonyms
    useEffect(() => {
        setArrayOfSynonymArrays(SeparateListOfSynsIntoSets())
    }, [currentDef])

    // Whenever the arrayOfSynonymsArrays state changes, update state of CurrentSynArray
    useEffect(() => {
        setCurrentSynArray(arrayOfSynonymArrays[0])
    }, [arrayOfSynonymArrays])

    // Whenever the CurrentSynArray state changes, update Next & Prev button States
    useEffect(() => {
        // PreviousDefinitionBtn State
        if (arrayOfSynonymArrays.indexOf(currentSynArray) === 0) {
            setSynPrevBtnDisabled(true)
        } else {
            setSynPrevBtnDisabled(false)
        }
        // NextDefinitionBtn State
        if (arrayOfSynonymArrays.indexOf(currentSynArray) === arrayOfSynonymArrays.length - 1) {
            setSynNextBtnDisabled(true)
        } else {
            setSynNextBtnDisabled(false)
        }
    }, [currentSynArray])
    
    // Find total of synonyms for "Showing X out of TOTAL"
    const CalculateTotalSyns = () => {
        let totalSyns = 0
        currentDef.meta.syns.map(synonymArray => {
            totalSyns += synonymArray.length
        })
        return totalSyns
    }

    // Find total shown synonyms per page
    const CalculateShowingSynAmount = () => {
        const currentIndex = arrayOfSynonymArrays.indexOf(currentSynArray)
        let synCount = 0
        
        // If on first page, set as currentSynArray.length else, we're on another page
        if (currentIndex === 0) {
            synCount = currentSynArray.length
            return synCount
        } else if (currentIndex > 0) {
            // Loop over arrayOfSynonymArrays and stop and currentIndex
            arrayOfSynonymArrays.forEach(array => {
                // get the index of current array
                const arrayIndex = arrayOfSynonymArrays.indexOf(array)
                if (arrayIndex <= currentIndex) {
                    // Add array's length to synonym count
                    synCount += array.length
                }
            })
            return synCount
        }
    }

    // Create a combined list of all synonyms for this definition
    // Returns nothing because it's affecting allSynonyms
    const CreateArrayOfAllSyns = () => {
        if (currentDef.meta.syns.length === 0) {
            return null
        }

        let allSynonyms = []
        currentDef.meta.syns.forEach(synonymArray => {
            synonymArray.forEach(synonym => {
                allSynonyms.push(synonym)
            })
        })
        return allSynonyms
    }

    const SeparateListOfSynsIntoSets = () => {
        const allSynonyms = CreateArrayOfAllSyns()
        let separationAmount = 15
        let arraysOfSynonyms = []
        let setOf10Array = []
        
        allSynonyms.forEach(synonym => {
            // If the array 10 or less, add current synonym
            if (setOf10Array.length < separationAmount) {
                setOf10Array.push(synonym)
            } else if (setOf10Array.length === separationAmount) {
                // If we've filled the array and their are still words,
                // Add the array to Array of Arrays then clear array
                arraysOfSynonyms.push(setOf10Array)
                setOf10Array = []
                // After we clear the array, add the word to it
                setOf10Array.push(synonym)
            }
        })
        arraysOfSynonyms.push(setOf10Array)
        return arraysOfSynonyms
    }
    
    if (currentDef.meta.syns.length === 0) {
        return null
    }

    if (currentSynArray === undefined) {
        return null
    }

    return (
        <>
            <hr className="definition__divider"></hr>
            <h4 className="card__h4 definition__h4--synonym">synonyms</h4>
            {
                // Only show if there is more than one "page" of synonyms
                arrayOfSynonymArrays.length === 1 ? null :
                <>
                <p className="synonym__total">showing {CalculateShowingSynAmount()} out of {CalculateTotalSyns()}</p>
                
                {/* MAKE THIS A COMPONENT BECAUSE IT'S USED BY BOTH DEFINITIONS AND SYNONYMS */}
                <div className="synonym__next">
                <button                      
                    onClick={e => {
                        const previous = arrayOfSynonymArrays.indexOf(currentSynArray) - 1
                        setCurrentSynArray(arrayOfSynonymArrays[previous])
                    }}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}
                    className={arrayOfSynonymArrays.indexOf(currentSynArray) === 0 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}>
                        <IconArrow rotation="icon__arrow--rotated" color="icon__black" disabled={synPrevBtnDisabled} />
                    </button>

                    <p className="next__text"> {arrayOfSynonymArrays.indexOf(currentSynArray) + 1} / {arrayOfSynonymArrays.length}</p>
                    
                    <button
                    onClick={e => {
                        const next = arrayOfSynonymArrays.indexOf(currentSynArray) + 1
                        setCurrentSynArray(arrayOfSynonymArrays[next])
                    }}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}
                    className={arrayOfSynonymArrays.indexOf(currentSynArray) === arrayOfSynonymArrays.length - 1 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}>
                        <IconArrow color="icon__black" disabled={synNextBtnDisabled} />
                    </button>
                </div>
                </>
            }
            <ul className="word__list synonym__words">
                {
                    currentSynArray.map(synonym => {
                        ++keyValue
                        return <WordButton key={keyValue} word={synonym} isSelectedCard={false} />
                    })
                }
            </ul>
        </>
    )
}

export default DefinitionCardSynonyms