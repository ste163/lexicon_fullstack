import React from 'react'
import { RemovableItemButton } from '../buttons/Buttons'
import './Details.css'

const Details = ({
    history,
    selectedItem,
    isCollections,
    selectedUrlToPushTo,
    editUrlToPushTo,
    deleteUrlToPushTo 
}) => (
    <>
        <article>
            <h3>
                {isCollections ? selectedItem.collection.name : selectedItem.project.name}
            </h3>
            {isCollections ? (
                <p className="details__p">
                    selectedItem.collection.description
                </p>
            ) : (
                null
            )}

            {/* Show linked to following collections for projects */}
            <h4>
                Linked to the following {isCollections ? "projects" : "collections"}:
            </h4>
            <ul className="details__ul">
                {isCollections ? (
                    selectedItem.projectCollections.map(c => <RemovableItemButton key={c.project.id} text={c.project.name} isActive={false} />)
                ) : (
                    selectedItem.projectCollections.map(c => <RemovableItemButton key={c.collection.id} text={c.collection.name} isActive={false} />)
                )}
            </ul>
            {isCollections ? <h4>Total words in {selectedItem.collection.name} : <span>{selectedItem.words.length}</span></h4> : null}
        </article>
        
        {/* If it's the project manager, switch out with other links */}
        <div className="details__btns">
            {isCollections ? (
                <button
                    className="btn btn__details--dash"
                    onClick={() => history.push(selectedUrlToPushTo(selectedItem.collection.id))}>
                        View on Dashboard
                </button>
            ) : (
                null
            )}
            <div className="btns__edit-delete">
                <button
                    className="btn btn__details--edit"
                    onClick={() => history.push(editUrlToPushTo(isCollections ? selectedItem.collection.id : selectedItem.project.id))}>
                        Edit
                    </button>
                <button
                    className="btn btn--red btn__details--delete"
                    onClick={() => history.push(deleteUrlToPushTo(isCollections ? selectedItem.collection.id : selectedItem.project.id))}>
                        Delete
                    </button>
            </div>
        </div>
    </>    
)

export default Details