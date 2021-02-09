import React, { useContext, useState, useEffect } from 'react'
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
    CollectionManagerDeleteRoute,
    ProjectManagerRoute,
    ProjectManagerCreateRoute,
    ProjectManagerDetailsRoute,
    ProjectManagerEditRoute,
    ProjectManagerDeleteRoute,
} from './utils/Routes'

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    const { setObjectToDelete, setIsDeleteModalOpen } = useContext(DeleteContext)
    let currentUrl = useLocation().pathname
    const history = useHistory()

    // Dashboard column state needed at this level so the router can change them
    const [ isListColumnActive, setIsListColumnActive ] = useState(true);
    const [ isSelectedColumnActive, setIsSelectedColumnActive ] = useState(false);

    const {
        getProjects,
        getProjectById,
        setSelectedProject,

        // Project Manager
        setIsProjectManagerOpen,
        setIsProjectCreateFormOpen,
        setIsProjectDetailsOpen,
        setIsProjectEditFormOpen,
        setIsFetchingProjectDetails
    } = useContext(ProjectContext)

    const {
        getCollections,
        getCollectionById,
        selectedCollection,
        setSelectedCollection,

        // Collection Manager
        setIsCollectionManagerOpen,
        setIsCollectionCreateFormOpen,
        setIsCollectionDetailsOpen,
        setIsCollectionEditFormOpen,
        setIsFetchingCollectionDetails
    } = useContext(CollectionContext)

    // State router switches state on/off based on the URL pathname
    const StateRouter = () => {
        const routeParamId = findRouteParam(currentUrl)

        // If an id is ever 0, set state to undefined, and re-route to /app
        if (routeParamId === "0") {
            currentUrl = AppRoute()
            setSelectedCollection(undefined)
        } 

        const turnOffAllCollectionRoutes = () => {
            setIsCollectionCreateFormOpen(false)
            setIsCollectionManagerOpen(false)
            setIsCollectionDetailsOpen(false)
            setIsCollectionEditFormOpen(false)
        }

        const turnOffAllProjectRoutes = () => {
            setIsProjectManagerOpen(false)
            setIsProjectCreateFormOpen(false)
            setIsProjectDetailsOpen(false)
            setIsProjectEditFormOpen(false)
        }

        const turnOffAllButDelete = () => {
            turnOffAllCollectionRoutes()
            turnOffAllProjectRoutes()
        }

        switch (currentUrl) {
            case AuthRoute():
                setIsDeleteModalOpen(false)
                turnOffAllButDelete()
                break

            case AppSelectedRoute(routeParamId):
                // Turn off all open modals
                turnOffAllButDelete()
                setIsDeleteModalOpen(false)

                // set SelectedCollection
                getCollectionById(routeParamId)
                .then(collectionDetails => setSelectedCollection(collectionDetails))
                .catch(error => history.goBack())
                setIsSelectedColumnActive(true)
                break

            case AppRoute():
                // Checks if routeParam is 0 or undefined selectedCollection
                if (!selectedCollection || routeParamId === "0") {
                    turnOffAllButDelete()
                    setIsDeleteModalOpen(false)
                    setIsSelectedColumnActive(false)
                } else {
                    // Push to the selectedCollection Route
                    history.push(AppSelectedRoute(selectedCollection.collection.id))
                }
                break

            case SettingsRoute():
                turnOffAllCollectionRoutes()
                turnOffAllProjectRoutes()
                // Close all modals
                // Open Settings modal
                break

            // Project Manager
            case ProjectManagerRoute():
                // Whenever we hit the ProjectManager, getProjects
                getProjects() // Currently doesn't show a loading icon though. Which I'd like to add

                turnOffAllCollectionRoutes()
                setIsProjectCreateFormOpen(false)
                setIsProjectDetailsOpen(false)
                setIsProjectEditFormOpen(false)
                setIsProjectManagerOpen(true)
                break 

            case ProjectManagerCreateRoute():
                turnOffAllCollectionRoutes()
                setIsProjectManagerOpen(true)
                setIsProjectCreateFormOpen(true)
                setIsProjectEditFormOpen(false)
                setIsProjectDetailsOpen(false)
                break

            case ProjectManagerDetailsRoute(routeParamId):
                setIsFetchingProjectDetails(true)
                turnOffAllCollectionRoutes()

                getProjectById(routeParamId)
                .then(projectDetails => setSelectedProject(projectDetails))
                .catch(error => history.goBack())

                setIsProjectDetailsOpen(true) 
                setIsProjectManagerOpen(true)
                setIsProjectCreateFormOpen(false)
                setIsProjectEditFormOpen(false)
                break

            case ProjectManagerEditRoute(routeParamId):
                // Hide Details and Show Edit form by switching their opacity
                getProjectById(routeParamId)
                .then(project => setSelectedProject(project))
                .catch(error => history.goBack())

                setIsProjectEditFormOpen(true)
                setIsProjectDetailsOpen(true) 
                setIsProjectManagerOpen(true)
                break

            case ProjectManagerDeleteRoute(routeParamId):
                getProjectById(routeParamId)
                .then(projectDetails => setObjectToDelete(projectDetails.project))
                .catch(error => history.goBack()) // if an error, on retrieval, go back a page

                turnOffAllButDelete()
                setIsDeleteModalOpen(true)
                break
            

            // Collection Manager
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
                .then(collectionDetails => setSelectedCollection(collectionDetails))
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
                .then(collectionDetails => {
                    setObjectToDelete(collectionDetails.collection)
                    setSelectedCollection(undefined)
                })
                .catch(error => history.goBack()) // if an error, on retrieval, go back a page

                turnOffAllButDelete()
                setIsDeleteModalOpen(true)
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
                {isLoggedIn ? (
                    <MainView
                        isListColumnActive={isListColumnActive}
                        setIsListColumnActive={setIsListColumnActive}
                        isSelectedColumnActive={isSelectedColumnActive}
                        setIsSelectedColumnActive={setIsSelectedColumnActive} />
                ) : (
                    <Redirect to={AuthRoute()} />
                )}
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