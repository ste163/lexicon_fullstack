import React from 'react'  
import { HeaderBranding } from '../branding/Branding'
import HeaderMobileContent from './HeaderMobileContent'
import { IconHamburger } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
// Main container for mobile header

const HeaderMobile = () => (
    <header className="header">
        <HeaderBranding />

        <button
        className="btn__no-style btn__hamburger"
        onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
        onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}
        onClick={e => console.log("SHOW BURGER")}>
           <IconHamburger color={"icon__whiteNoChange"}/>
        </button>

        {/* most likely will ned to pass a REF into here so the IconHamburger can change the style */}
        <HeaderMobileContent />
    </header>
)

export default HeaderMobile