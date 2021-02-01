import React from 'react'
import { useHistory } from 'react-router-dom'

// Holds Create, Search, and Filtering for lists

const ListControls = ({ urlToPushTo, createNewString }) => {
    const history = useHistory()

    return (
        <section>
            <button
            className="btn"
            onClick={e => history.push(urlToPushTo()) }>
                Create new {createNewString}
            </button>
        </section>
    )
}

export default ListControls