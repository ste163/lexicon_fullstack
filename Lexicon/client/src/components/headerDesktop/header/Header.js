import React from 'react'
import { Logout, Settings } from '../../buttons/Buttons'
import { LexLogo, LexTitle } from '../../branding/Branding'
import './Header.css'

const Header = () => (
        <header className="header">

            <section className="header__branding">
                <LexLogo location={"logo__header--lex"} color={"logo__white"} />
                <LexTitle location={"title__header"} color={"title__white"} />
            </section>

            <nav>
                <ul className="nav__list">
                    <div className="nav__rightAligned">
                        <li className="nav__item">
                            <Settings />
                        </li>
                        
                        <li className="nav__item">
                            <Logout />
                        </li>
                    </div>
                </ul>
            </nav>
        
        </header>
)

export default Header