import React from "react"
import { IconArrow } from "../icons/Icons"
import "./ListCard.css"
// Individual info card/button for a Project / Collection, clicking goes to its details
// To use
    // pass in items
    // useHistory
    // details to push to

const ListCard = ({item, urlToPushTo, history }) => (
    <button
        id={item.id}
        className="card btn__collection card__list"
        onClick={e => history.push(urlToPushTo(+e.target.id))}>
        <h2 id={item.id} className="list__h2">{item.name}</h2>
        <p id={item.id} className="list__p">{item.description}</p>
        <div id={item.id} className="list__arrow">
            <IconArrow id={item.id} color="icon__gray" />
        </div>
    </button>
)

export default ListCard