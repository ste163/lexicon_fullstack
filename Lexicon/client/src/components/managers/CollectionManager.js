import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionManagerCreateRoute, CollectionManagerRoute } from '../../utils/Routes'
import { CollectionContext } from '../../providers/CollectionProvider'
import { CollectionManagerDetailsRoute } from '../../utils/Routes'
import { ManagerArrow } from '../buttons/Buttons'
import DetailsContainer from '../details/DetailsContainer'
import ListControls from '../../components/lists/ListControls'
import ListCardContainer from '../lists/ListCardContainer'
import CollectionForm from '../forms/CollectionForm'
import './Manager.css'

const CollectionManager = () => {
    const history = useHistory()
    const {
        collections,
        selectedCollection,
        isFetchingCollections,
        isFetchingCollectionDetails,
        isCollectionCreateFormOpen,
        isCollectionDetailsOpen,
        isCollectionEditFormOpen
    } = useContext(CollectionContext)
    

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">

            <DetailsContainer
                selectedItem={selectedCollection}
                history={history}
                managerUrlToPushTo={CollectionManagerRoute}
                isFetching={isFetchingCollectionDetails}
                isDetailsOpen={isCollectionDetailsOpen} />

            <section 
                // Will need to have checking on is the form open or details OR edit
                className={isCollectionCreateFormOpen ? (
                    "manager__list manager__list--inactive--form"
                    ) : isCollectionDetailsOpen ? (
                        "manager__list manager__list--inactive--details"
                    ) : (
                        "manager__list"
                    )}>
                <ListControls
                    history={history}
                    formUrlToPushTo={CollectionManagerCreateRoute}
                    createNewString={"collection"} />

                <ListCardContainer
                    history={history}
                    detailsUrlToPushTo={CollectionManagerDetailsRoute}
                    isFetching={isFetchingCollections}
                    items={collections}  />
            </section>

            <section
                className={isCollectionCreateFormOpen ? (
                    "manager__form manager__form--active"
                    ) : (
                    "manager__form"
                )}>

                <ManagerArrow
                    isForm={true}
                    managerUrlToPushTo={CollectionManagerRoute}
                    history={history} />

                <CollectionForm
                    history={history} />
            </section>


        </section>
    )
}

export default CollectionManager