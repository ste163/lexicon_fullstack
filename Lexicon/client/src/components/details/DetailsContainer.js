import React from 'react'
import Details from './Details' 
import { ManagerArrow } from '../buttons/Buttons'
import './Details.css'

const DetailsContainer = ({
    selectedItem,
    isFetching,
    isDetailsOpen, 
    history,
    managerUrlToPushTo,
    selectedUrlToPushTo,
    editUrlToPushTo,
    deleteUrlToPushTo
}) => (
    // POSSIBLE ERROR: If we get undefined, PUSH us back to the collection-manager
    // might need to put this here??? We'll see what happens

    <section
        className={isDetailsOpen ? (
            "manager__details manager__details--active"
        ) : (
            "manager__details"
        )}>

        {isFetching ? (
            <div
                className={isDetailsOpen ? (
                    "spinner__center"
                ) : (
                    "manager__details"
                )}>
                <div className="cls-spinner">
                    <div className="cls-circle cls-spin"></div>
                </div>
            </div>
        ) : (
        <>
            <ManagerArrow
                isForm={false}
                history={history}
                managerUrlToPushTo={managerUrlToPushTo} />


            <section className="details"> 
                {selectedItem == undefined ? (
                        null
                    ) : (
                        <Details
                            selectedItem={selectedItem}
                            isCollectionManager={true}
                            history={history}
                            selectedUrlToPushTo={selectedUrlToPushTo}
                            editUrlToPushTo={editUrlToPushTo}
                            deleteUrlToPushTo={deleteUrlToPushTo} />
                )}
            </section>
        </>
        )}
    </section>
)

export default DetailsContainer