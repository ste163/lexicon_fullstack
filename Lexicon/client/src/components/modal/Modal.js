import React from "react"
import { IconClose } from "../icons/Icons"
import { ChangeIconClassOnHover } from "../../utils/ChangeIconClassOnHover"
import "./Modal.css"

// To use Modal
    // Add content with
        // contentFunction
    // Add a type label to top right corner with
        // contentHeader
    // Pass in isOpen and setIsOpen state
        
const Modal = props => (
    props.isOpen ? (
        // Background
        <section className="background__modal modal__active"
        onClick={e => {
            // If you click on the background, close modal
            if (e.target.className === "background__modal modal__active") {
                props.setIsOpen(false)
            }
        }}>
    
            {/* Modal Card */}
            <article className={`modal__container`}>
                <section className="modal__header">
                    <div className="card__type">
                        {props.contentHeader}
                    </div>
                    <button className="btn__close"
                    onClick={e => props.setIsOpen(false)}
                    onMouseOver={e => ChangeIconClassOnHover(e, true, "icon__gray", "icon__hovered")}
                    onMouseLeave={e => ChangeIconClassOnHover(e, true, "icon__hovered", "icon__gray")}>
                        <IconClose color="icon__gray" />
                    </button>
                </section>
                {/* Modal body content */}
                <section className="modal__content">
                    {props.contentFunction}                
                </section>
            </article>
        </section>
    ) : (
        null
    )
)

export default Modal