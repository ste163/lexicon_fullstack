import React, { useState } from 'react'  
import { HeaderBranding } from '../branding/Branding'
import HeaderMobileContent from './HeaderMobileContent'
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
            <IconHamburger color={"icon__whiteNoChange"}/>
            </button>
        
            <HeaderMobileContent isOpen={{ hamburgerIsOpen }} />
        </header>
    )
}

export default HeaderMobile