import React, { useState } from 'react'  
import { HeaderBranding } from '../branding/Branding'
import HamburgerContent from './HamburgerContent'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
// Main container for mobile header

const HeaderMobile = () => {

    const [ hamburgerIsOpen, setHamburgerIsOpen ] = useState(false)

    return (
        <header className="header">
            <HeaderBranding />

            <button
            className={hamburgerIsOpen ? (
                "btn__no-style btn__hamburger btn__hamburger--active"
            ) : (
                "btn__no-style btn__hamburger "
            )}
            onClick={e => {
                if (hamburgerIsOpen) {
                    setHamburgerIsOpen(false)
                }
                 else if (!hamburgerIsOpen) {
                    setHamburgerIsOpen(true)
                }
            }}>
                <div className="hamburger__bar"></div>
            </button>
        
            <HamburgerContent isOpen={{ hamburgerIsOpen }} />
        </header>
    )
}

export default HeaderMobile