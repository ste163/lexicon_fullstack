import React from 'react'
import Details from './Details' 
import { ManagerArrow } from '../buttons/Buttons'
import './Details.css'

const DetailsContainer = ({
    history,
    selectedItem,
    isFetching,
    isDetailsOpen,
    isEditFormOpen,
    EditForm,
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

            <section className="details card card__color--brightWhite card__details"> 
                {selectedItem == undefined ? (
                    null
                ) : (
                    // If we're editing, show edit form, else show details
                    // But to have smooth animations, both will need to be rendered. The Ternary
                    // will have to be on the className={}
                    isEditFormOpen ? (
                        <EditForm />
                    ) : (
                        <Details
                            selectedItem={selectedItem}
                            isCollectionManager={true}
                            history={history}
                            selectedUrlToPushTo={selectedUrlToPushTo}
                            editUrlToPushTo={editUrlToPushTo}
                            deleteUrlToPushTo={deleteUrlToPushTo} />
                    )
                )}

            </section>
        </>
        )}
    </section>
)

export default DetailsContainer