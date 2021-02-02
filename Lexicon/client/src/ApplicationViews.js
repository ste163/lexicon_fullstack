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

    const { setIsCollectionManagerOpen, setIsCollectionCreateFormOpen } = useContext(CollectionContext)

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

        switch (currentUrl) {
            case AuthRoute():
                break
            case AppRoute():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(false)
                break
            case SettingsRoute():
                // Close all modals
                // Open Settings modal
                break
            case CollectionManagerRoute():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(true)
                break 
            case CollectionManagerCreateRoute():
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(true)
                break
            case CollectionManagerDetailsRoute(routeParamId):
                // GetCollectionById(routeParamId)
                    // setSelectedCollection as this ones Id
                // Show loading screen until that item shows up
                // if we get an error, show a toast error then revert back to collection-manager
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