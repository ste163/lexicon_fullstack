import React from "react"
import { useHistory } from 'react-router-dom'
import { IconClose } from "../icons/Icons"
import { ChangeIconClassOnHover } from "../../utils/ChangeIconClassOnHover"
import "./Modal.css"
// To use Modal
    // Add content with
        // contentFunction
    // Add a type label to top right corner with
        // contentHeader
    // Pass in isOpen state
        
const Modal = props => {
    const history = useHistory()

    const closeModal = () => {
        // need to store the last selected collection to return the app to the correct view.
        history.push('/app')
    }
    
    return (
        // Background
        <section className={props.isOpen ? (
            "background__modal modal__active" 
        ) : (
            "background__modal" 
        )}
        onClick={e => {
            // If you click on the background, close modal
            if (e.target.className === "background__modal modal__active") {
                closeModal()
            }
        }}>

            {/* Modal Card */}
            <article className="modal__container">
                <section className="modal__header">
                    <div className="card__type">
                        {props.contentHeader}
                    </div>
                    <button className="btn__close"
                    onClick={e => closeModal()}
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
    )

    }



export default Modal