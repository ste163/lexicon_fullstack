import React from 'react'
import './Inputs.css'

export const DropDown = ({ nameOf, fieldsetLocation, labelIdName, currentState, setCurrentState, stateArray, isHamburger  }) => {
// To use:
    // nameOf the dropdown for placeholders like 'collection' or 'project'
    // fieldsetLocation ClassName for either 'subHeader__fieldset' etc
    // labelIdName like 'collectionSelect'
    // currentState like 'selectedCollection' for the current item in state
    // stateArray to map over and create drop-downs
    // isHamburger is a bool to style labels and drop-downs

    // if (!stateArray) {
    //     return null
    // }

    return (
        <fieldset className={fieldsetLocation}>
            <label
            className={!isHamburger ? (
                ""
            ) : (
                "label__hamburger"
            )}
            htmlFor="collectionSelect">
                Selected {nameOf}:
            </label>

            <select
            className={!isHamburger ? (
                ""
            ) : (
                "select__hamburger"
            )}
            id={labelIdName}
            name={labelIdName}
            value={currentState === undefined ? 0 : currentState.id}
            onChange={e => setCurrentState(e)}>
                <option value="0">Select {nameOf}</option>
                {/* {stateArray.map(stateItem => {(
                    <option key={stateItem.id} value={stateItem.id}>
                        {stateItem.name}
                    </option>
                )})} */}
            </select>
        </fieldset>
    )
}