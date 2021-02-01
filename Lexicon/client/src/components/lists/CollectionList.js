import React, { useContext } from 'react'
import { CollectionContext } from '../../providers/CollectionProvider'
import './CollectionList.css'
import ListCard from './ListCard'

const CollectionList = () => {
    const { isFetchingCollections, collections } = useContext(CollectionContext)

    console.log(isFetchingCollections)
    if (isFetchingCollections) {
        return (
        <div className="spinner__center">
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </div>
        )
    }
    
    if (!collections) {
        return (
            <div>No collections yet</div>
        )
    }

    return (
        collections.map(collection => {
            return <ListCard key={collection.id} collection={collection} />
        })
    )
}

export default CollectionList