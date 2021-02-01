import React from 'react'
import ListCard from './ListCard'
import './ListCardContainer.css'
// To use:
    // pass in an isFetching for the loading spinner
    // items as a state of collections or projects
    // useHistory to allow for pushing
    // url route to push to
    // PROBABLY need to pass in a card/message component for if no info yet
    
const CollectionList = ({ history, isFetching, items, detailsUrlToPushTo }) => {

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
                return <ListCard key={item.id} item={item} history={history} detailsUrlToPushTo={detailsUrlToPushTo} />
            })}
        </section>
    )
}

export default CollectionList