import React, { useContext } from "react"
import { CollectionContext } from "../../providers/CollectionProvider"
import { IconArrow } from "../icons/Icons"
import "./ListCard.css"
// Collections and Projects will display as identical list cards in their managers

const ListCard = ({item}) => (
    <button
    id={item.id}
    className="card card__color--white card__list btn__collection"
    onClick={e => {
        console.log("PUSH: /app/project/manager/details/", +e.target.id)
    }}>
        <h2 id={item.id} className="list__h2">{item.name}</h2>
        <p id={item.id} className="list__p">{item.description}</p>
        <div id={item.id} className="list__arrow">
            <IconArrow id={item.id} color="icon__gray" />
        </div>
    </button>
)
 
export default ListCard