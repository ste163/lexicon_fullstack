import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/UserProvider'
import { IconLogout, IconGear, IconArrow } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
import { SettingsRoute } from '../../utils/Routes'
import SettingsForm from '../forms/SettingsForm'
import Modal from '../modal/Modal'
import './Buttons.css'

// Buttons take a { isMobile } prop that is a boolean. Allows for the SubHeader styling and Hamburger styling
export const Logout = ({ isMobile }) => {
    const { logout } = useContext(UserContext)

    return (
        <button
            className={!isMobile ? (
                "nav__btn btn__logout"
            ) : (
                "nav__btn btn__logout btn__mobile"
            )} 
            onClick={() => logout()}
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
            <IconLogout color="icon__whiteNoChange" />
            Logout
        </button>
    )
}

// Clicking a WordButton opens its definition card
export const WordButton = ({ word, getWordFromThesaurus, isSelectedCard }) => (
    <li className="item__li">
        <button className="btn btn--pill"
            onClick={e => getWordFromThesaurus(word)}>
            {word}
        </button>
    </li>
)

// Delete WordButton
export const DeleteWordButton = ({ wordId, word, history, deleteUrlToPushTo }) => (
    <li className="item__li">
        <button className="btn btn--pill btn--red"
            onClick={e => history.push(deleteUrlToPushTo(wordId))}>
            {word}
        </button>
    </li>
)

//  Settings currently not implemented
// export const Settings = ({ isMobile }) => (
    // <button
    //     className={!isMobile ? (
    //         "nav__btn btn__settings"
    //     ) : (
    //         "nav__btn btn__settings btn__mobile"
    //     )}
    //     onClick={() => history.push(SettingsRoute())}
    //     onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
    //     onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
    //     <IconGear color="icon__whiteNoChange" />
    //     Settings
    // </button>
//)

export const DropDownOptions = ({ itemToSelectString, items }) => (
    <>
        <option value="0">Select {itemToSelectString}</option>
        {items.map(item => {
            return <option key={item.id} value={item.id}>
                {item.name}
            </option>
        })}
    </>
)

export const AddableButton = ({
    item,
    onClickFunction,
    itemsAvailableStateArray,
    setItemsAvailableStateArray,
    itemsAddedState,
    setItemsAddedToStateArray }) => (
    <li className="item__li">
        <button   
            className="btn btn--pill"
            onClick={e => onClickFunction(e, itemsAvailableStateArray, setItemsAvailableStateArray, itemsAddedState, setItemsAddedToStateArray)}>
            {item.name}
        </button>
    </li>
)

export const RemovableItemButton = ({ text, isActive }) => (
    <li className="item__li">
        <button
            className={isActive ? (
                "btn btn--pill"
            ) : (
                "btn btn--pill btn--disabled"
            )}
            disabled={isActive}>
                {text}
        </button>
    </li>
)

export const ManagerButton = ({
    isMobile,
    managerRoute,
    managerBtnText,
    setHamburgerIsOpen }) => {
        const history = useHistory()

        return (
            <button
                className={!isMobile ? (
                    "btn btn__subheader"
                ) : (
                    "btn__mobile"
                )}
                onClick={() => {  
                    if (isMobile) {
                        setHamburgerIsOpen.setHamburgerIsOpen(false)
                    }
                    history.push(managerRoute())}}>
                {managerBtnText}
            </button>
        )
}

export const ManagerArrow = ({ isForm, history, managerUrlToPushTo }) => (
    <button
        className="btn__no-style btn__manager card btn__card--arrow btn__collection "
        onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__gray', 'icon__hovered')}
        onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__gray', 'icon__hovered')}
        onClick={e => {
            e.preventDefault()
            history.push(managerUrlToPushTo())}}>
                {isForm ? (
                    <IconArrow color="icon__gray" />
                ) : (
                    <IconArrow rotation="icon__arrow--rotated" color="icon__gray" />
                )}
    </button>
)

export const ManagerCreate = ({ history, formUrlToPushTo, createNewString }) => (
    <button
        onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__black', 'icon__whiteNoChange')}
        onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__black', 'icon__whiteNoChange')}
        className="btn btn__controls"
        onClick={e => history.push(formUrlToPushTo()) }>
        <IconArrow color="icon__black" rotation="icon__arrow--rotated" />
        Create new {createNewString}
    </button>
)
