import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionManagerCreate } from '../../utils/Routes'
import { CollectionContext } from '../../providers/CollectionProvider'
import ListControls from '../../components/lists/ListControls'
import ListCardContainer from '../lists/ListCardContainer'
import CollectionForm from '../forms/CollectionForm'
import './Manager.css'

const CollectionManager = () => {
    const { collections, isFetchingCollections, isCollectionCreateFormOpen, isCollectionDetailsOpen, isCollectionEditFormOpen} = useContext(CollectionContext)

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">
            <section 
                className={!isCollectionCreateFormOpen ? (
                    "manager__list"
                ) : (
                    "manager__list manager__list--inactive"
                )}>
                <ListControls urlToPushTo={CollectionManagerCreate} createNewString={"collection"} />
                <ListCardContainer isFetching={isFetchingCollections} items={collections}/>
            </section>

            <CollectionForm />
        </section>
    )
}

export default CollectionManager