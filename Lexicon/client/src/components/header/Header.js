import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { IconLogout, IconGear } from "../icons/Icons"
import Modal from "../modal/Modal"
import LexLogo from "../branding/LexLogo"
import LexTitle from "../branding/LexTitle"
import SettingsForm from '../forms/SettingsForm'
import "./Header.css"

const Header = () => {

    // Instantiate useHistory to use it
    const history = useHistory()

    // Get references for modals
    const settingsModal = useRef()

    // Util for changing just the setting svg icon
    const ChangeHeaderSettingSvgClassOnHover = (hoverEvent, isOnMouseOver) => {
        const svg = hoverEvent.currentTarget.firstElementChild.children[1].classList
        if (isOnMouseOver) {
            svg.remove("icon__whiteNoChange")
            svg.add("icon__hovered")
        } else {
            svg.remove("icon__hovered")
            svg.add("icon__whiteNoChange")
        }
    }

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
                            onMouseOver={e => ChangeHeaderSettingSvgClassOnHover(e, true)}
                            onMouseLeave={e => ChangeHeaderSettingSvgClassOnHover(e, false)}>
                                <IconGear color="icon__whiteNoChange" />
                                Settings
                            </button>
                        </li>
                        
                        <li className="nav__item">
                            <button className="nav__btn btn__logout" 
                            onClick={() => {
                                sessionStorage.clear("currentUserId")
                                sessionStorage.clear("currentUser")                              
                                window.location.reload();
                            }}
                            onMouseOver={e => {
                                e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                    svg.classList.remove("icon__whiteNoChange")
                                    svg.classList.add("icon__hovered")
                                })
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                    svg.classList.remove("icon__hovered")
                                    svg.classList.add("icon__whiteNoChange")
                                })
                            }}>
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