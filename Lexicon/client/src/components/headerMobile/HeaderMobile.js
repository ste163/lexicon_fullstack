import React, { useState } from 'react'  
import { HeaderBranding } from '../branding/Branding'
import HamburgerMenu from './HamburgerMenu'
// Main container for mobile header

const HeaderMobile = ({ projects, collections }) => {
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
        
            <HamburgerMenu
                projects={projects}
                collections={collections}
                isOpen={{ hamburgerIsOpen }}
                setIsOpen={{ setHamburgerIsOpen }} />
        </header>
    )
}

export default HeaderMobile