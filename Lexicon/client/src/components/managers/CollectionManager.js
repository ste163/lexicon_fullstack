import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionManagerCreateRoute } from '../../utils/Routes'
import { CollectionContext } from '../../providers/CollectionProvider'
import { CollectionManagerDetailsRoute } from '../../utils/Routes'
import ListControls from '../../components/lists/ListControls'
import ListCardContainer from '../lists/ListCardContainer'
import CollectionForm from '../forms/CollectionForm'
import './Manager.css'

const CollectionManager = () => {
    const history = useHistory()
    const {
        collections,
        isFetchingCollections,
        isCollectionCreateFormOpen,
        isCollectionDetailsOpen,
        isCollectionEditFormOpen
    } = useContext(CollectionContext)
    

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">
            <section 
                className={!isCollectionCreateFormOpen ? (
                    "manager__list"
                ) : (
                    "manager__list manager__list--inactive"
                )}>
                <ListControls
                    history={history}
                    urlToPushTo={CollectionManagerCreateRoute}
                    createNewString={"collection"} />

                <ListCardContainer
                    history={history}
                    detailsUrlToPushTo={CollectionManagerDetailsRoute}
                    isFetching={isFetchingCollections}
                    items={collections}  />
            </section>

            <CollectionForm />
        </section>
    )
}

export default CollectionManager