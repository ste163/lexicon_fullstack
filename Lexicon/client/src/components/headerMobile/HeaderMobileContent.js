import React from 'react' 
import { Settings, Logout }  from '../buttons/Buttons'
// Slide in from right and take up almost/all of the screen width

// NEED TO DECIDE THE ORDERING OF THESE
// WILL HOLD CREATING A COLLECTION, CREATING A PROJECT
// AND SELECTING A COLUMN TO DISPLAY
const HeaderMobileContent = ({ isOpen }) => (
    !isOpen.hamburgerIsOpen ? (
        null
    ) : (
        <nav className="hamburger__nav">
            <ul>
                <li className="nav__item">
                    <Settings />
                </li>
                <li className="nav__item">
                    <Logout />
                </li>
            </ul>
        </nav>
    )
)
    



export default HeaderMobileContent