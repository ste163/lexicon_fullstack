import React from 'react' 
import { Settings, Logout, CreateCollection }  from '../buttons/Buttons'
import './HamburgerMenu.css'
// Slide in from right and take up almost/all of the screen width

// NEED TO DECIDE THE ORDERING OF THESE
// WILL HOLD CREATING A COLLECTION, CREATING A PROJECT
// AND SELECTING A COLUMN TO DISPLAY

// Could have it animate by, when it loads in, you slide in X pixels from the right.
const HamburgerMenu = ({ isOpen }) => (
    <nav
    className={isOpen.hamburgerIsOpen ? (
            "hamburger__nav hamburger__nav--active"
        ) : (
            "hamburger__nav hamburger__nav--inactive"
        )
    }>
        <ul className="nav__list--hb">
            <li className="nav__item">
                <CreateCollection />
            </li>
            <li className="nav__item">
                <Settings />
            </li>
            <li className="nav__item">
                <Logout />
            </li>
        </ul>
    </nav>
)

export default HamburgerMenu