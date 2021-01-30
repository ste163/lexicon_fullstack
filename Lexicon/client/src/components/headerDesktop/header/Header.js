import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { IconLogout, IconGear } from '../../icons/Icons'
import { UserContext } from '../../../providers/UserProvider'
import Modal from '../../modal/Modal'
import LexLogo from '../../branding/LexLogo'
import LexTitle from '../../branding/LexTitle'
import SettingsForm from '../../forms/SettingsForm'
import { ChangeIconClassOnHover } from '../../../utils/ChangeIconClassOnHover'
import './Header.css'

const Header = () => {

    // Instantiate useHistory to use it
    const history = useHistory()

    const { logout } = useContext(UserContext)

    // Get references for modals
    const settingsModal = useRef()

    return (
        <header className="header">
        <Modal  ref={settingsModal} contentFunction={<SettingsForm/>} contentHeader={"Settings"}/>

            <section className="header__branding">
                <LexLogo location={"logo__header--lex"} color={"logo__white"} />
                <LexTitle location={"title__header"} color={"title__white"} />
            </section>

            <nav>
                <ul className="nav__list">
                    <div className="nav__rightAligned">
                        <li className="nav__item">
                            <button className="nav__btn btn__settings"
                            onClick={() => { 
                                settingsModal.current.className = "background__modal modal__active"
                            }}
                            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
                            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
                                <IconGear color="icon__whiteNoChange" />
                                Settings
                            </button>
                        </li>
                        
                        <li className="nav__item">
                            <button className="nav__btn btn__logout" 
                            onClick={() => logout()}
                            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
                            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}>
                                <IconLogout color="icon__whiteNoChange" />
                                Logout
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
        
        </header>
    )
}

export default Header