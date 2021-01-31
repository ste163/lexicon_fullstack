import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'


const ApplicationViews = () => {
    const currentURL = useLocation();
    const { isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        if (isLoggedIn) {
            console.log("CHANGED TO", currentURL)
            // On every page change
            // check the URL
            // SWITCH STATEMENT if it matches, globally change state
                // /app/collection-manager
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