import React from "react"
import { Route } from "react-router-dom"
// import MainView from "./views/main/MainView"


const ApplicationViews = () => (
    // Based on our logged-in/authentication state, show Auth or Main
    // Put app__container in the MainView
    <div className="app__container">                          
        <Route path="/">
            <p>LEXICON</p>
            {/* Move header, subheader, and footer to the MainView */}
            {/* <Header />
            <SubHeader />
            <MainView />
            <Footer /> */}
        </Route>
    </div> 
)

export default ApplicationViews