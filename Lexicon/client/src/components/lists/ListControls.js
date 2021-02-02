import React from 'react'
import { ManagerCreate } from '../buttons/Buttons'
import './ListControls.css'
// Create, Search, and Filtering for lists
// To use
    // pass in a useHistory
    // urlToPush
    // and string with 'collection' etc.

const ListControls = ({ history, formUrlToPushTo, createNewString }) => (
    <section className="card card__color--white card__controls">
        <ManagerCreate
            history={history} 
            formUrlToPushTo={formUrlToPushTo}
            createNewString={createNewString} />
    </section>
)


export default ListControls