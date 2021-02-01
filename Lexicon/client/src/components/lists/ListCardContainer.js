import React from 'react'
import ListCard from './ListCard'
import './ListCardContainer.css'

// To use:
    // pass in an isFetching for the loading spinner
    // items as a state of collections or projects
    // PROBABLY need to pass in a card/message component for if no info yet
const CollectionList = ({ isFetching, items }) => {

    // Loading spinner while fetching
    if (isFetching) {
        return (
        <div className="spinner__center">
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </div>
        )
    }
    
    // Message for no items
    if (!items) {
        return (
            <div>No ITEMS yet</div>
        )
    }

    // Map over items to display as cards
    return (
        <section className="list__container">
            {items.map(item => {
                return <ListCard key={item.id} item={item} />
            })}
        </section>
    )
}

export default CollectionList