import React, { useContext, useRef } from 'react'
import { IconLogout, IconGear } from '../icons/Icons'
import { UserContext } from '../../providers/UserProvider'
import Modal from '../modal/Modal'
import SettingsForm from '../forms/SettingsForm'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'

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
    const settingsModal = useRef()

    return (
        <>
            <Modal  ref={settingsModal} contentFunction={<SettingsForm/>} contentHeader={"Settings"}/>

            <button className="nav__btn btn__settings"
            onClick={() => { 
                settingsModal.current.className = "background__modal modal__active"
            }}
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
                <IconGear color="icon__whiteNoChange" />
                Settings
            </button>
        </>
    )
}