import React, { useContext, useState } from 'react'
import { UserContext } from '../../providers/UserProvider'
import { IconLogout, IconGear, IconPlus } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
import SettingsForm from '../forms/SettingsForm'
import CollectionForm from '../forms/CollectionForm'
import Modal from '../modal/Modal'

export const Logout = () => {
    const { logout } = useContext(UserContext)

    return (
        <button className="nav__btn btn__logout" 
        onClick={() => logout()}
        onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
        onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
            <IconLogout color="icon__whiteNoChange" />
            Logout
        </button>
    )
}

export const Settings = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentFunction={<SettingsForm/>} contentHeader={"Settings"}/>

            <button className="nav__btn btn__settings"
            onClick={() => setIsOpen(true)}
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
                <IconGear color="icon__whiteNoChange" />
                Settings
            </button>
        </>
    )
}

export const CreateCollection = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentFunction={<CollectionForm />} contentHeader={"Collection"} />

            <button className="collection__btn"
            onClick={() => setIsOpen(true)}
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__gray', 'icon__hovered')}
            onMouseOut={e => ChangeIconClassOnHover(e, false, 'icon__gray', 'icon__hovered')}>
                <IconPlus color="icon__gray" />
                Create new collection
            </button>
        </>
    )
}