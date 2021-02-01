import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import { CollectionContext } from './providers/CollectionProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'
import {
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

    const findPathnameId = () => {
        const regex = /\d+/
        const match = currentUrl.match(regex)
        if (match !== null) {
            return match[0]
        }
    }

    const StatePathnameRouter = () => {
    // REQUIRED URL PATHS
        // /app/selected/{id}
            //which needs its own state that everything is tracking against.
            //If we have a selected/{id} default to that instead of /app

        // /app/collection-manager/edit/{param}

        // /app/project-manager
        // /app/project-manager/create
        // /app/project-manager/details/{param}
    
        // have a regex that finds if there are any numbers in the pathname
        // that number will be what we pass into the SWITCH so it can route
        // to the proper location. 
        // AFTER we hit that new switch case,
        // do get GetById(pathnameId) so we have the most up-to-date info
        // and if we get undefined/null, show a message that 'unable to find info for that collection/project'
    
        let pathnameId = findPathnameId()
    
        console.log("CHANGED TO", currentUrl)
    
        switch (currentUrl) {
            case Auth():
                break
            case App():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(false)
                break
            case Settings():
                
                break
            case CollectionManager():
                setIsCollectionCreateFormOpen(false)
                setIsCollectionManagerOpen(true)
                break 
            case CollectionManagerCreate():
                setIsCollectionManagerOpen(true)
                setIsCollectionCreateFormOpen(true)
                break
            case CollectionManagerDetails(pathnameId):
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