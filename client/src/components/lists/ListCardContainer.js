import React from 'react'
import ListCard from './ListCard'
import './ListCardContainer.css'
// To use:
    // pass in an isFetching for the loading spinner
    // items as a state of collections or projects
    // useHistory to allow for pushing
    // url route to push to
    
const CollectionList = ({ history, searchTerms, isFetching, items, urlToPushTo }) => {

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
    
    if (!items) {
        return (
            null
        )
    }

    // Map over items to display as cards
    return (
        <section className="list__container">
            {searchTerms === "" ? ( null 
                ) : ( 
                    items.length !== 0 ? (
                        <h2 className="search__heading">Matching searches...</h2>
                    ) : (
                        <h2 className="search__heading">No matching searches</h2>
                    ))}
           
                {items.map(item => {
                    return <ListCard key={item.id} item={item} history={history} urlToPushTo={urlToPushTo} />
                })}
        </section>
    )
}

export default CollectionList