import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import { CollectionContext } from './providers/CollectionProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'
import {
    findRouteParam,
    App,
    Auth,
    Settings,
    CollectionManager,
    CollectionManagerCreate,
    CollectionManagerDetails
}
from './utils/Routes'

const ApplicationViews = () => {
    const currentUrl = useLocation().pathname
    const { isLoggedIn } = useContext(UserContext)
    const history = useHistory()

    const { setIsCollectionManagerOpen, setIsCollectionCreateFormOpen } = useContext(CollectionContext)

    const StatePathnameRouter = () => {
    // REQUIRED URL PATHS
        // /app/selected/{id}
            //which needs its own state that everything is tracking against.
            //If we have a selected/{id} default to that instead of /app

        // /app/collection-manager/edit/{param}

        // /app/project-manager
        // /app/project-manager/create
        // /app/project-manager/details/{param}
    
        const routeParamId = findRouteParam(currentUrl)
    
        console.log(currentUrl)
    
        switch (currentUrl) {
            case Auth():
                break
            case App():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(false)
                break
            case Settings():
                // Close all modals
                // Open Settings modal
                break
            case CollectionManager():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(true)
                break 
            case CollectionManagerCreate():
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(true)
                break
            case CollectionManagerDetails(routeParamId):
                // GetCollectionById(routeParamId)
                    // setSelectedCollection as this ones Id
                // Show loading screen until that item shows up
                // if we get an error, show a toast error then revert back to collection-manager
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(false)
                break;
            default:
                history.push(App())
                break
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            StatePathnameRouter()
        }
    }, [currentUrl])

    return (
        <Switch>
            <Route path={App()}>
                {isLoggedIn ? <MainView /> : <Redirect to={Auth()} />}
            </Route>
            <Route path={Auth()}>
                {isLoggedIn ? <Redirect to={App()} /> : <AuthView />}
            </Route>
            <Route path="/">
                {isLoggedIn ? <Redirect to={App()} /> : <Redirect to={Auth()} />}
            </Route>
        </Switch>
    )
}
    
export default ApplicationViews