import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useParams, useHistory } from 'react-router-dom'
import { UserContext } from './providers/UserProvider'
import { CollectionContext } from './providers/CollectionProvider'
import { App, Auth, CollectionManager, CollectionManagerCreate, Settings } from './utils/Routes'
import AuthView from './views/auth/AuthView'
import MainView from './views/main/MainView'


const ApplicationViews = () => {
    const currentURL = useLocation().pathname
    const history = useHistory()
    const { collectionId } = useParams()
    const { isLoggedIn } = useContext(UserContext)
    const { setIsCollectionManagerOpen, setIsCollectionCreateFormOpen } = useContext(CollectionContext)

// Use query string parameters to get the ids 
// https://reactrouter.com/web/example/query-parameters
// https://stackoverflow.com/questions/40161516/how-do-you-programmatically-update-query-params-in-react-router

// To handle the Ids, we'd need the current state of AllProjects and AllCollections
// then, a 'find' to see if there is that Id in the url for a collection or project
// if there is, set that to the id variable, then go to that link
// otherwise, maybe show a toast that 'that doesn't exist'

    // REQUIRED URL PATHS
    // /app/selected/{id}
        //which needs its own state that everything is tracking against.
        //If we have a selected/{id} default to that instead of /app

    // /app/collection-manager
    // /app/collection-manager/create
    // /app/collection-manager/details/{param}
        // these {params} don't exist, so i'd need to split the string to get the Id
    // /app/collection-manager/edit/{param}

    // /app/project-manager
    // /app/project-manager/create
    // /app/project-manager/details/{param}

    // Should move StateRouter into Routes?
    // Or its own file? Could be in Utils?
    const StateRouter = () => {
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
                case Auth():
                    break;
                case App():
                    setIsCollectionCreateFormOpen(false)
                    setIsCollectionManagerOpen(false)
                    break;
                case Settings():
                    
                    break;
                case CollectionManager():
                    setIsCollectionCreateFormOpen(false)
                    setIsCollectionManagerOpen(true)
                    break; 
                case CollectionManagerCreate():
                    setIsCollectionManagerOpen(true)
                    setIsCollectionCreateFormOpen(true)
                    break;                 
                default:
                    history.push(App())
                    break;
            }
        }
    }, [currentURL])

    return (
        <Switch>
            <Route path={App()}>
                {isLoggedIn ? <MainView /> : <Redirect to={Auth()} />}
            </Route>

            <Route path={"/app/collection-manager/details/:collectionId"} />

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