import React from 'react' 
import { Settings, Logout, ManageCollections, ManageProjects }  from '../buttons/Buttons'
import { DropDown } from '../inputs/Inputs'
import './HamburgerMenu.css'
// Slide in from right and take up almost/all of the screen width

// NEED TO DECIDE THE ORDERING OF THESE
// AND SELECTING A COLUMN TO DISPLAY

// Could have it animate by, when it loads in, you slide in X pixels from the right.
const HamburgerMenu = ({ isOpen, setIsOpen }) => (
    <nav
    className={isOpen.hamburgerIsOpen ? (
            "hamburger__nav hamburger__nav--active"
        ) : (
            "hamburger__nav hamburger__nav--inactive"
        )
    }>
        <ul className="nav__list--hb">
            <div className="hb__container">
                <li className="nav__item nav__item--hb">
                    <ManageCollections isMobile={true} setHamburgerIsOpen={setIsOpen}  />
                </li>
                <li className="nav__item nav__item--hb">
                    <ManageProjects isMobile={true} setHamburgerIsOpen={setIsOpen} />
                </li>
                <li>
                    <DropDown nameOf='collection' fieldsetLocation='hamburger__fieldset' labelIdName='collectionSelect' isHamburger={true} />
                </li>
                <li>
                    <DropDown nameOf='project' fieldsetLocation='hamburger__fieldset' labelIdName='projectSelect' isHamburger={true} />
                </li>
            </div>

            <div className="hb__container">
                <li className="nav__item nav__item--hb nav__item--settings">
                    <Settings isMobile={true} />
                </li>
                <li className="nav__item nav__item--hb">
                    <Logout isMobile={true} />
                </li>
            </div>
        </ul>
    </nav>
)

export default HamburgerMenu