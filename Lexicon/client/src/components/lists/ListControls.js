import React from 'react'
// Create, Search, and Filtering for lists
// To use
    // pass in a useHistory
    // urlToPush
    // and string with 'collection' etc.

const ListControls = ({ history, urlToPushTo, createNewString }) => (
    <section>
        <button
        className="btn"
        onClick={e => history.push(urlToPushTo()) }>
            Create new {createNewString}
        </button>
    </section>
)


export default ListControls