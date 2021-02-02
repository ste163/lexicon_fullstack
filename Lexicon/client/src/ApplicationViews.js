import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import { CollectionContext } from './providers/CollectionProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'
import {
    findRouteParam,
    AppRoute,
    AuthRoute,
    SettingsRoute,
    CollectionManagerRoute,
    CollectionManagerCreateRoute,
    CollectionManagerDetailsRoute
}
from './utils/Routes'

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    const currentUrl = useLocation().pathname
    const history = useHistory()

    const {
        getCollectionById,
        setSelectedCollection,
        setIsCollectionManagerOpen,
        setIsCollectionCreateFormOpen,
        setIsCollectionDetailsOpen
    } = useContext(CollectionContext)

    // State router switches state on/off based on the URL pathname
    const StateRouter = () => {
    // REQUIRED URL PATHS
        // /app/selected/{id}
            //which needs its own state that everything is tracking against.
            //If we have a selected/{id} default to that instead of /app

        // /app/collection-manager/edit/{param}

        // /app/project-manager
        // /app/project-manager/create
        // /app/project-manager/details/{param}
    
        const routeParamId = findRouteParam(currentUrl)

        const turnOffAllCollectionRoutes = () => {
            setIsCollectionCreateFormOpen(false)
            setIsCollectionManagerOpen(false)
            setIsCollectionDetailsOpen(false)
        }

        const turnOffAllProjectRoutes = () => {

        }

        switch (currentUrl) {
            case AuthRoute():
                turnOffAllCollectionRoutes()
                break
            case AppRoute():
                turnOffAllCollectionRoutes()
                break
            case SettingsRoute():
                // Close all modals
                // Open Settings modal
                break
            case CollectionManagerRoute():
                turnOffAllProjectRoutes()
                setIsCollectionCreateFormOpen(false)
                setIsCollectionDetailsOpen(false)
                setIsCollectionManagerOpen(true)
                break 
            case CollectionManagerCreateRoute():
                turnOffAllProjectRoutes()
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(true)
                setIsCollectionDetailsOpen(false)
                break
            case CollectionManagerDetailsRoute(routeParamId):
                turnOffAllProjectRoutes()
                getCollectionById(routeParamId)
                // When we leave this route, will need to reset the loading spinner state!  
                // if we get an error, show a toast error then revert back to collection-manager
                setIsCollectionDetailsOpen(true) 
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(false)
                break;
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