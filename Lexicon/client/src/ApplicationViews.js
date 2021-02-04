import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import { DeleteContext } from './providers/DeleteProvider'
import { CollectionContext } from './providers/CollectionProvider'
import { ProjectContext } from './providers/ProjectProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'
import {
    findRouteParam,
    AuthRoute,
    AppRoute,
    AppSelectedRoute,
    SettingsRoute,
    CollectionManagerRoute,
    CollectionManagerCreateRoute,
    CollectionManagerDetailsRoute,
    CollectionManagerEditRoute,
    CollectionManagerDeleteRoute
} from './utils/Routes'

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    const { getCollections } = useContext(CollectionContext)
    const { setObjectToDelete, setIsDeleteModalOpen } = useContext(DeleteContext)
    const currentUrl = useLocation().pathname
    const history = useHistory()

    const {
        getCollectionById,
        setSelectedCollection,

        // Collection Manager
        setIsCollectionManagerOpen,
        setIsCollectionCreateFormOpen,
        setIsCollectionDetailsOpen,
        setIsCollectionEditFormOpen,
        setIsFetchingCollectionDetails
    } = useContext(CollectionContext)

    const {
        getProjectById,
        setSelectedProject,

        // Project Manager
        setIsProjectManagerOpen,
        setIsProjectCreateFormOpen,
        setIsProjectDetailsOpen,
        setIsProjectEditFormOpen,
        setIsFetchingProjectDetails
    } = useContext(ProjectContext)

    // State router switches state on/off based on the URL pathname
    const StateRouter = () => {
    // URL PATHS TO DO
        // /app/selected/{id}
            //which needs its own state that everything is tracking against.
            //If we have a selected/{id} default to that instead of /app
    
        const routeParamId = findRouteParam(currentUrl)

        const turnOffAllCollectionRoutes = () => {
            setIsCollectionCreateFormOpen(false)
            setIsCollectionManagerOpen(false)
            setIsCollectionDetailsOpen(false)
            setIsCollectionEditFormOpen(false)
        }

        const turnOffAllProjectRoutes = () => {

        }

        const turnOffAllButDelete = () => {
            turnOffAllCollectionRoutes()
            turnOffAllProjectRoutes()
        }

        switch (currentUrl) {
            case AuthRoute():
                setIsDeleteModalOpen(false)
                turnOffAllCollectionRoutes()
                break

            case AppRoute():
                turnOffAllCollectionRoutes()
                setIsDeleteModalOpen(false)
                break

            case AppSelectedRoute(routeParamId):
                // Set collectionOnDash state
                // if there is anything ever in it, default to that
                // instead of App Route
                // so put an if check in AppRoute to switch to this case
                // OR put AppSelectedRoute first in switch
                break

            case SettingsRoute():
                turnOffAllCollectionRoutes()
                turnOffAllProjectRoutes()
                // Close all modals
                // Open Settings modal
                break

            case CollectionManagerRoute():
                // Whenever we hit the CollectionManager, getCollections
                getCollections() // Currently doesn't show a loading icon though. Which I'd like to add

                turnOffAllProjectRoutes()
                setIsCollectionCreateFormOpen(false)
                setIsCollectionDetailsOpen(false)
                setIsCollectionEditFormOpen(false)
                setIsCollectionManagerOpen(true)
                break 

            case CollectionManagerCreateRoute():
                turnOffAllProjectRoutes()
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(true)
                setIsCollectionEditFormOpen(false)
                setIsCollectionDetailsOpen(false)
                break

            case CollectionManagerDetailsRoute(routeParamId):
                setIsFetchingCollectionDetails(true)
                turnOffAllProjectRoutes()

                getCollectionById(routeParamId)
                .then(collection => setSelectedCollection(collection))
                .catch(error => history.goBack()) // if an error, on retrieval, go back a page
                // When we leave this route, will need to reset the loading spinner state!  
                // if we get an error, show a toast error then revert back to collection-manager

                setIsCollectionDetailsOpen(true) 
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(false)
                setIsCollectionEditFormOpen(false)
                break

            case CollectionManagerEditRoute(routeParamId):
                // Hide Details and Show Edit form by switching their opacity
                getCollectionById(routeParamId)
                .then(collection => setSelectedCollection(collection))
                .catch(error => history.goBack()) // if an error, on retrieval, go back a page

                setIsCollectionEditFormOpen(true)
                setIsCollectionDetailsOpen(true) 
                setIsCollectionManagerOpen(true)
                break

            case CollectionManagerDeleteRoute(routeParamId):
                getCollectionById(routeParamId)
                .then(collection => setObjectToDelete(collection))
                .catch(error => history.goBack()) // if an error, on retrieval, go back a page

                turnOffAllButDelete()
                setIsDeleteModalOpen(true)
                // 5. If DELETE, then delete object, then return to the previous manager/page
                        // setObjectToDelete({}) -- occurs at the end of a successful delete ONLY
                break

            default:
                history.push(AppRoute())
                break
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            StateRouter()
        }
    }, [currentUrl])

    return (
        <Switch>
            <Route path={AppRoute()}>
                {isLoggedIn ? <MainView /> : <Redirect to={AuthRoute()} />}
            </Route>
            <Route path={AuthRoute()}>
                {isLoggedIn ? <Redirect to={AppRoute()} /> : <AuthView />}
            </Route>
            <Route path="/">
                {isLoggedIn ? <Redirect to={AppRoute()} /> : <Redirect to={AuthRoute()} />}
            </Route>
        </Switch>
    )
}
    
export default ApplicationViews