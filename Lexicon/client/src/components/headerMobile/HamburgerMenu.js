import React from 'react' 
import { Settings, Logout, ManagerButton }  from '../buttons/Buttons'
import { CollectionManagerRoute, ProjectManagerRoute } from '../../utils/Routes'
import { DropDown } from '../inputs/Inputs'
import './HamburgerMenu.css'

const HamburgerMenu = ({
    isOpen,
    setIsOpen,
    projects,
    collections,
    appSelectedRoute,
    history,
    selectedCollection }) => (
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
                    <ManagerButton
                        isMobile={true}
                        setHamburgerIsOpen={setIsOpen}
                        managerRoute={CollectionManagerRoute}
                        managerBtnText={"Manage Collections"} />
                </li>
                <li className="nav__item nav__item--hb">
                    <ManagerButton
                        isMobile={true}
                        setHamburgerIsOpen={setIsOpen}
                        managerRoute={ProjectManagerRoute}
                        managerBtnText={"Manage Projects"} />
                </li>
                <li>
                    <DropDown
                        nameOf='Selected collection'
                        stateArray={collections}
                        currentState={selectedCollection}
                        urlToPushTo={appSelectedRoute}
                        isCollection={true}
                        history={history}
                        fieldsetLocation='hamburger__fieldset'
                        labelIdName='collectionSelect' 
                        isHamburger={true} />
                </li>
            </div>

            <div className="hb__container">
                {/* <li className="nav__item nav__item--hb nav__item--settings">
                    <Settings isMobile={true} />
                </li> */}
                <li className="nav__item nav__item--hb">
                    <Logout isMobile={true} />
                </li>
            </div>
        </ul>
    </nav>
)

export default HamburgerMenu