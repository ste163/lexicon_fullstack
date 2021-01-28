import React from "react"
import { Route } from "react-router-dom"
import MainView from "./views/main/MainView"


const ApplicationViews = () => (
    // Based on our logged-in/authentication state, show Auth or Main
    
    
        <Route path="/">
            <MainView />
        </Route>
)

export default ApplicationViews