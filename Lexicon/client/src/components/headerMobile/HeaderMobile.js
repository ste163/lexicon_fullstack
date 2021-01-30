import React from 'react'  
import LexLogo from '../branding/LexLogo'
import LexTitle from '../branding/LexTitle'
import { IconHamburger } from '../icons/Icons'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
// Main container for mobile header

const HeaderMobile = () => (
    <header className="header">
        <section className="header__branding">
            <LexLogo location={"logo__header--lex"} color={"logo__white"} />
            <LexTitle location={"title__header"} color={"title__white"} />
        </section>

        <button
        className="btn__no-style"
        onMouseOver={e => ChangeIconClassOnHover(e, true, 'icon__whiteNoChange', 'icon__hovered')}
        onMouseLeave={e => ChangeIconClassOnHover(e, false, 'icon__whiteNoChange', 'icon__hovered')}
        onClick={e => console.log("OPEN BURGER")}>
           <IconHamburger color={"icon__whiteNoChange"}/>
        </button>
    </header>
)

export default HeaderMobile