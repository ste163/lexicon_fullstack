import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useParams, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'


const ApplicationViews = () => {
    const currentURL = useLocation().pathname
    const history = useHistory()
    const { collectionId } = useParams()
    const { isLoggedIn } = useContext(UserContext)

    const stateSetter = () => {
        // possibly have this state setter that loops through
        // all the states and sets the correct state for open and closing the different modals
        // along with what is the active project and active collection
        // but this might actually end up becoming the currentURL checker

    }

    useEffect(() => {
        if (isLoggedIn) {
            console.log("CHANGED TO", currentURL)
            console.log("PARAMS", collectionId)
            switch (currentURL) {
                case '/auth':
                    break;
                case '/app':
                    break;
                case '/app/collection-manager':
                    console.log("OPEN")
                    break;         
                default:
                    history.push('/app')
                    break;
            }
            // On every page change
            // check the URL
            // SWITCH STATEMENT if it matches, globally change state
                // /app/collection-manager
                        // SetCollectionManageOpen(true)
                // /app/collection-manager/create
                // /app/collection-manager/details/{param}
                    // these {params} don't exist, so i'd need to split the string to get the Id
                // /app/collection-manager/edit/{param}

                // /app/project-manager
                // /app/project-manager/create
                // /app/project-manager/details/{param}
        }
    }, [currentURL])

    return (
        <Switch>
            <Route path="/app">
                {isLoggedIn ? <MainView /> : <Redirect to ="/auth" />}
            </Route>

            <Route path={"/app/collection-manager/details/:collectionId"} />

            <Route path="/auth">
                {isLoggedIn ? <Redirect to="/app" /> : <AuthView />}
            </Route>
            <Route path="/">
                {isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/auth" />}
            </Route>
        </Switch>
    )
}
    


export default ApplicationViews