import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './providers/UserProvider'
import { CollectionProvider } from './providers/CollectionProvider'
import ApplicationViews from './ApplicationViews'
import 'react-toastify/dist/ReactToastify.min.css'
import './Lexicon.css'

const Lexicon = () => (
    <>
        <ToastContainer position="top-center" hideProgressBar closeOnClick draggable autoClose={4000}/>

        <UserProvider>
            <CollectionProvider>
                <Router>
                    <ApplicationViews />
                </Router>    
            </CollectionProvider>
        </UserProvider>
    </>
)

export default Lexicon