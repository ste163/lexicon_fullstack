import React from 'react'
import { Logout, Settings } from '../../buttons/Buttons'
import { HeaderBranding } from '../../branding/Branding'
import './Header.css'

const Header = () => (
    <header className="header">
        <HeaderBranding />

        <nav>
            <ul className="nav__list">
                <div className="nav__rightAligned">
                    {/* <li className="nav__item">
                        <Settings />
                    </li> */}
                    
                    <li className="nav__item">
                        <Logout />
                    </li>
                </div>
            </ul>
        </nav>  
    </header>
)

export default Header