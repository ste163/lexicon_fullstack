import React, { useState } from 'react'  
import { HeaderBranding } from '../branding/Branding'
import HamburgerContent from './HamburgerContent'
import { IconHamburger, IconClose } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
// Main container for mobile header

const HeaderMobile = () => {

    const [ hamburgerIsOpen, setHamburgerIsOpen ] = useState(false)

    return (
        <header className="header">
            <HeaderBranding />

            <button
            className="btn__no-style btn__hamburger"
            onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
            onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}
            onClick={e => {
                if (hamburgerIsOpen) {
                    setHamburgerIsOpen(false)
                }
                 else if (!hamburgerIsOpen) {
                    setHamburgerIsOpen(true)
                }
            }}>
                {hamburgerIsOpen ? (
                    <IconClose color={"icon__whiteNoChange"} />
                    ) : (
                    <IconHamburger color={"icon__whiteNoChange"}/>
                )}
            </button>
        
            <HamburgerContent isOpen={{ hamburgerIsOpen }} />
        </header>
    )
}

export default HeaderMobile