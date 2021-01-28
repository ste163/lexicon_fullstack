import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'


const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    
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