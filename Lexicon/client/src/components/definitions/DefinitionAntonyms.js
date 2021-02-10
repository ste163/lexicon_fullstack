// Render antonyms for current definition
// Also sorts antonyms into arrays of 10
import React, { useEffect, useState } from "react"
import { ChangeIconClassOnHover } from "../../utils/ChangeIconClassOnHover"
import { IconArrow } from "../../components/icons/Icons"
import { WordButton } from "../../components/buttons/Buttons"

const DefinitionAntonyms = ({ currentDef, getWordFromThesaurus }) => {

    

    // Couldn't use .indexOf for WordButton keys for antonyms, so using global keyValue
    let keyValue = 0

    // Final Array of Arrays of all antonyms separated into sets of 10
    const [ arrayOfAntonymArrays, setArrayOfAntonymArrays ] = useState([])

    // setState for previous and next buttons
    const [ antPrevBtnDisabled, setAntPrevBtnDisabled ] = useState(true)
    const [ antNextBtnDisabled, setAntNextBtnDisabled ] = useState(false)

    // Current antonym from array of arrays
    const [ currentAntArray, setCurrentAntArray ] = useState([])

    // Separated so we can get the current array of arrays of antonyms
    useEffect(() => {
        setArrayOfAntonymArrays(SeparateListOfAntsIntoSets())
    }, [currentDef])

    // Whenever the arrayOfAntonymsArrays state changes, update state of CurrentAntArray
    useEffect(() => {
        setCurrentAntArray(arrayOfAntonymArrays[0])
    }, [arrayOfAntonymArrays])

    // Whenever the CurrentAntArray state changes, update Next & Prev button States
    useEffect(() => {
        // PreviousDefinitionBtn State
        if (arrayOfAntonymArrays.indexOf(currentAntArray) === 0) {
            setAntPrevBtnDisabled(true)
        } else {
            setAntPrevBtnDisabled(false)
        }
        // NextDefinitionBtn State
        if (arrayOfAntonymArrays.indexOf(currentAntArray) === arrayOfAntonymArrays.length - 1) {
            setAntNextBtnDisabled(true)
        } else {
            setAntNextBtnDisabled(false)
        }
    }, [currentAntArray])
    
    // Find total of antonyms for "Showing X out of TOTAL"
    const CalculateTotalAnts = () => {
        let totalAnts = 0
        currentDef.meta.ants.map(antonymArray => {
            totalAnts += antonymArray.length
        })
        return totalAnts
    }

    // Find total shown antonyms per page
    const CalculateShowingAntAmount = () => {
        const currentIndex = arrayOfAntonymArrays.indexOf(currentAntArray)
        let antCount = 0
        
        // If on first page, set as currentAntArray.length else, we're on another page
        if (currentIndex === 0) {
            antCount = currentAntArray.length
            return antCount
        } else if (currentIndex > 0) {
            // Loop over arrayOfAntArrays and stop and currentIndex
            arrayOfAntonymArrays.forEach(array => {
                // get the index of current array
                const arrayIndex = arrayOfAntonymArrays.indexOf(array)
                if (arrayIndex <= currentIndex) {
                    // Add array's length to ant count
                    antCount += array.length
                }
            })
            return antCount
        }
    }

    // Create a combined list of all antonyms for this definition
    // Returns nothing because it's affecting allAntonyms
    const CreateArrayOfAllAnts = () => {
        if (currentDef.meta.ants.length === 0) {
            return null
        }

        let allAntonyms = []
        currentDef.meta.ants.forEach(antonymArray => {
            antonymArray.forEach(antonym => {
                allAntonyms.push(antonym)
            })
        })
        return allAntonyms
    }

    const SeparateListOfAntsIntoSets = () => {
        const allAntonyms = CreateArrayOfAllAnts()
        let separationAmount = 10
        let arraysOfAntonyms = []
        let setOf10Array = []
        
        allAntonyms.forEach(antonym => {
            // If the array 10 or less, add current antonym
            if (setOf10Array.length < separationAmount) {
                setOf10Array.push(antonym)
            } else if (setOf10Array.length === separationAmount) {
                // If we've filled the array and their are still words,
                // Add the array to Array of Arrays then clear array
                arraysOfAntonyms.push(setOf10Array)
                setOf10Array = []
                // After we clear the array, add the word to it
                setOf10Array.push(antonym)
            }
        })
        arraysOfAntonyms.push(setOf10Array)
        return arraysOfAntonyms
    }
    
    if (currentDef.meta.ants.length === 0) {
        return null
    }

    if (currentAntArray === undefined) {
        return null
    }

    return (
        <>
            <hr className="antonym__divider"></hr>

            <h4 className="card__h4 definition__h4--antonym">antonyms</h4>
            {
                // Only show if there is more than one "page" of antonyms
                arrayOfAntonymArrays.length === 1 ? null :
                <>
                <p className="antonym__total">showing {CalculateShowingAntAmount()} out of {CalculateTotalAnts()}</p>
                
                <div className="antonym__next">
                <button                      
                    onClick={e => {
                        const previous = arrayOfAntonymArrays.indexOf(currentAntArray) - 1
                        setCurrentAntArray(arrayOfAntonymArrays[previous])
                    }}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}
                    className={arrayOfAntonymArrays.indexOf(currentAntArray) === 0 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}>
                        <IconArrow rotation="icon__arrow--rotated" color="icon__black" disabled={antPrevBtnDisabled} />
                    </button>

                    <p className="next__text"> {arrayOfAntonymArrays.indexOf(currentAntArray) + 1} / {arrayOfAntonymArrays.length}</p>
                    
                    <button
                    onClick={e => {
                        const next = arrayOfAntonymArrays.indexOf(currentAntArray) + 1
                        setCurrentAntArray(arrayOfAntonymArrays[next])
                    }}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__black", "icon__white")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, false, "icon__black", "icon__white")}
                    className={arrayOfAntonymArrays.indexOf(currentAntArray) === arrayOfAntonymArrays.length - 1 ? "btn btn__arrow btn--disabled" : "btn btn__arrow"}>
                        <IconArrow color="icon__black" disabled={antNextBtnDisabled} />
                    </button>
                </div>
                </>
            }
            <ul className="word__list antonym__words">
                {
                    currentAntArray.map(antonym => {
                        ++keyValue
                        return <WordButton
                                    key={keyValue}
                                    word={antonym}
                                    getWordFromThesaurus={getWordFromThesaurus}
                                    isSelectedCard={false} />
                    })
                }
            </ul>
        </>
    )
}

export default DefinitionAntonyms