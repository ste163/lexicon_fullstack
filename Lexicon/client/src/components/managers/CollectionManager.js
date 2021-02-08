import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionManagerCreateRoute, CollectionManagerRoute } from '../../utils/Routes'
import { CollectionContext } from '../../providers/CollectionProvider'
import { ManagerArrow } from '../buttons/Buttons'
import DetailsContainer from '../details/DetailsContainer'
import ListControls from '../../components/lists/ListControls'
import ListCardContainer from '../lists/ListCardContainer'
import CollectionForm from '../forms/CollectionForm'
import './Manager.css'
import {
    AppSelectedRoute,
    CollectionManagerDetailsRoute,
    CollectionManagerEditRoute,
    CollectionManagerDeleteRoute
} from '../../utils/Routes'

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
    
    // Will need to set state for searchTerms, filteredList
    // need a useEffect to reset search terms on re-load

    const [searchTerms, setSearchTerms] = useState("")
    const [filteredList, setFilteredList] = useState([])

    // handles list column searching
    useEffect(() => {
        if (searchTerms !== "") {
            const matches = collections.filter(c => c.name.toLowerCase().includes(searchTerms.toLowerCase().trim()) || c.description.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFilteredList(matches)
        } else {
            // no terms in search bar, so display all and reset filtered items
            setFilteredList(collections)
        }
    }, [searchTerms, collections])

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">
            <DetailsContainer
                history={history}
                isCollections={true}
                selectedItem={selectedCollection}
                isFetching={isFetchingCollectionDetails}
                isDetailsOpen={isCollectionDetailsOpen}
                isEditFormOpen={isCollectionEditFormOpen}
                itemToEdit={selectedCollection}
                EditForm={CollectionForm}
                managerUrlToPushTo={CollectionManagerRoute}
                selectedUrlToPushTo={AppSelectedRoute}
                editUrlToPushTo={CollectionManagerEditRoute}
                deleteUrlToPushTo={CollectionManagerDeleteRoute} />

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
                    setSearchTerms={setSearchTerms}
                    formUrlToPushTo={CollectionManagerCreateRoute}
                    createNewString={"collection"} />

                <ListCardContainer
                    history={history}
                    urlToPushTo={CollectionManagerDetailsRoute}
                    isFetching={isFetchingCollections}
                    searchTerms={searchTerms}
                    items={filteredList}  />
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