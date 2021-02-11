import React from 'react'
import { ManagerCreate } from '../buttons/Buttons'
import { SearchBar, DropDown } from '../inputs/Inputs'
import './ListControls.css'
// Create, Search, and Filtering for lists
// To use
    // pass in a useHistory
    // urlToPush
    // and string with 'collection' etc.

const ListControls = ({
    history,
    searchLabelTitle,
    searchPlaceholderText,
    isDashboard,
    setSearchTerms,
    formUrlToPushTo,
    createNewString }) => (
    <section className="card card__color--white card__controls">
        <ManagerCreate
            history={history} 
            isDashboard={isDashboard}
            formUrlToPushTo={formUrlToPushTo}
            createNewString={createNewString} />
        
        <SearchBar
            labelTitle={searchLabelTitle}
            placeholderText={searchPlaceholderText}
            setSearchTerms={setSearchTerms} />        
    </section>
)

export default ListControls