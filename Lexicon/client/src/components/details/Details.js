import React from 'react'
import './Details.css'

const Details = ({
    selectedItem,
    history,
    selectedUrlToPushTo,
    editUrlToPushTo,
    deleteUrlToPushTo 
}) => (
    <>
        <article>
            <h3>
                {selectedItem.name}
            </h3>
            {/* Don't show a description if it's projects */}
            <p className="details__p">
                {selectedItem.description}
            </p>
            {/* Show linked to following collections for projects */}
            <h4>Linked to the following projects: </h4>
            <p className="details__p">
                Pull in info from join table.
            </p>
            {/* Don't show total words if it's projects */}
            <h4>Total words in {selectedItem.name}: <span>{selectedItem.words}</span></h4>
        </article>

        {/* If it's the project manager, switch out with other links */}
        <div className="details__btns">
            <button
                className="btn btn__details--dash"
                onClick={() => history.push(selectedUrlToPushTo(selectedItem.id))}>
                    View on Dashboard
                </button>
            <div className="btns__edit-delete">
                <button
                    className="btn btn__details--edit"
                    onClick={() => history.push(editUrlToPushTo(selectedItem.id))}>
                        Edit
                    </button>
                <button
                    className="btn btn--red btn__details--delete"
                    onClick={() => history.push(deleteUrlToPushTo(selectedItem.id))}>
                        Delete
                    </button>
            </div>
        </div>
    </>    
)

export default Details