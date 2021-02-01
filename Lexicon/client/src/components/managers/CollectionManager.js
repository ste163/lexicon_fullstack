import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CollectionManagerCreate } from '../../utils/Routes'
import { CollectionContext } from '../../providers/CollectionProvider'
import CollectionList from '../../components/lists/CollectionList'
import CollectionForm from '../forms/CollectionForm'
import './CollectionManager.css'

const CollectionManager = () => {
    const history = useHistory()
    const { isCollectionCreateFormOpen, isCollectionDetailsOpen, isCollectionEditFormOpen} = useContext(CollectionContext)

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="manager__container">
            <section
            className={!isCollectionCreateFormOpen ? (
                "manager__list"
            ) : (
                "manager__list manager__list--inactive"
            )}>
                <button
                className="btn"
                onClick={e => history.push(CollectionManagerCreate()) }>
                    Create new collection
                </button>

                <CollectionList />

            </section>

            <CollectionForm />
        </section>
    )
}

export default CollectionManager