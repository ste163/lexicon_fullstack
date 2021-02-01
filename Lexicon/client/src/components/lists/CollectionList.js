import React, { useContext } from 'react'
import { CollectionContext } from '../../providers/CollectionProvider'
import './CollectionList.css'
import ListCard from './ListCard'

const CollectionList = () => {
    const { isFetchingCollections, collections } = useContext(CollectionContext)

    // Loading spinner while fetching
    if (isFetchingCollections) {
        return (
        <div className="spinner__center">
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </div>
        )
    }
    
    // Message for no collections. Make as a component so the Project manager is identical
    if (!collections) {
        return (
            <div>No collections yet</div>
        )
    }

    // Map over collections
    return (
        collections.map(collection => {
            return <ListCard key={collection.id} item={collection} />
        })
    )
}

export default CollectionList