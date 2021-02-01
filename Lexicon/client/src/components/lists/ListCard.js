import React from "react"
import { IconArrow } from "../icons/Icons"
import "./ListCard.css"
// To use
    // pass in items
    // useHistory
    // details to push to

const ListCard = ({item, detailsUrlToPushTo, history }) => (
    <button
        id={item.id}
        className="card card__color--white card__list btn__collection"
        onClick={e => history.push(detailsUrlToPushTo(+e.target.id))}>
        <h2 id={item.id} className="list__h2">{item.name}</h2>
        <p id={item.id} className="list__p">{item.description}</p>
        <div id={item.id} className="list__arrow">
            <IconArrow id={item.id} color="icon__gray" />
        </div>
    </button>
)

export default ListCard