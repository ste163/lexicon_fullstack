import React from 'react'
import './Details.css'

const Details = ({ isCollectionManager, selectedItem }) => (
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
                onClick={e => console.log("SET AS ACTIVE AND GO TO /app/selected/id")}>
                    View on Dashboard
                </button>
            <div className="btns__edit-delete">
                <button
                    className="btn btn__details--edit"
                    onClick={e => console.log("SET AS ACTIVE AND GO TO /app/collection-manager/edit/id")}>
                        Edit
                    </button>
                <button
                    className="btn btn__details--delete"
                    onClick={e => console.log("OPEN DELETE MODAL FOR /app/collection-manager/delete/id")}>
                        Delete
                    </button>
            </div>
        </div>
    </>    
)

export default Details