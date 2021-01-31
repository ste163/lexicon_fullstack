import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/UserProvider'
import { CollectionContext } from '../../providers/CollectionProvider'
import { IconLogout, IconGear } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
import SettingsForm from '../forms/SettingsForm'
import CollectionManager from '../managers/CollectionManager'
import Modal from '../modal/Modal'
import './Buttons.css'

// Buttons take a { isMobile } prop that is a boolean. Allows for the SubHeader styling and Hamburger styling
export const Logout = ({ isMobile }) => {
    const { logout } = useContext(UserContext)

    return (
        <button className={!isMobile ? (
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

export const Settings = ({ isMobile }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentFunction={<SettingsForm/>} contentHeader={"Settings"}/>

            <button className={!isMobile ? (
                "nav__btn btn__settings"
            ) : (
                "nav__btn btn__settings btn__mobile"
            )}
            onClick={() => setIsOpen(true)}
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
                <IconGear color="icon__whiteNoChange" />
                Settings
            </button>
        </>
    )
}

export const ManageCollections = ({ isMobile }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { isCollectionManagerOpen } = useContext(CollectionContext)
    const history = useHistory()

    return (
        <>
            <Modal isOpen={isCollectionManagerOpen} setIsOpen={setIsOpen} contentFunction={<CollectionManager />} contentHeader={"Collection Manager"} />

            <button className={!isMobile ? (
                "btn btn__subheader"
            ) : (
                "btn__mobile"
            )}
            onClick={() => history.push('app/collection-manager')}>
                Manage Collections
            </button>
        </>
    )
}

export const ManageProjects = ({ isMobile }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentFunction={<></>} contentHeader={"Project Manager"} />

            <button className={!isMobile ? (
                "btn btn__subheader"
            ) : (
                "btn__mobile"
            )}
            onClick={() => setIsOpen(true)}>
                Manage Projects
            </button>
        </>
    )
}