import React from 'react'
import './Details.css'

const Details = ({ history, isFetching, managerUrlToPushTo, isDetailsOpen }) => (
    // POSSIBLE ERROR: If we get undefined, PUSH us back to the collection-manager
    // might need to put this here??? We'll see what happens
    
    // Loading spinner if fetching, else details
    isFetching ? (
        <div
            className={isDetailsOpen ? (
                "spinner__center"
            ): (
                "manager__details"
            )}>
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </div>
    ) : (
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
)

export default Details