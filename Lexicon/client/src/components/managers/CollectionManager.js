import React, { useState } from 'react'
import CollectionForm from '../forms/CollectionForm'
import './CollectionManager.css'

const CollectionManager = () => {
    const [ isFormOpen, setIsFormOpen ] = useState(false)

    // Get the Create button working with the slide to form, and back and forth
    return (
        <section className="collection__manager">
            <section
            className={!isFormOpen ? (
                "manager__list"
            ) : (
                "manager__list manager__list--inactive"
            )}>
                <button
                className="btn"
                onClick={e => {setIsFormOpen(true)}}>
                    Create new collection
                </button>
            </section>

            <CollectionForm isOpen={isFormOpen} setIsOpen={setIsFormOpen}/>
        </section>
    )
}

export default CollectionManager