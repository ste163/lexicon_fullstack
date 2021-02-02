import React from 'react'
import './Details.css'

const Details = ({ history, isFetching, managerUrlToPushTo, isDetailsOpen }) => {

    // Loading spinner while fetching
    if (isFetching) {
        return (
        <div className="spinner__center">
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </div>
        )
    }

    // If we get undefined, PUSH us back to the collection-manager
    // might need to put this here.

    return (
        <section
            className={isDetailsOpen ? (
                "manager__details manager__details--active"
            ) : (
                "manager__details"
            )}>
                <button
                    onClick={e => history.push(managerUrlToPushTo())}>
                    Back
                </button>
                Details!
        </section>
    )
}

export default Details