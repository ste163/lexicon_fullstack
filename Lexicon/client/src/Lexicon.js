import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './providers/UserProvider'
import { DeleteProvider } from './providers/DeleteProvider'
import { CollectionProvider } from './providers/CollectionProvider'
import ApplicationViews from './ApplicationViews'
import 'react-toastify/dist/ReactToastify.min.css'
import './Lexicon.css'

const Lexicon = () => (
    <>
        <ToastContainer position="top-center" hideProgressBar closeOnClick draggable autoClose={4000}/>

        <UserProvider>
            <DeleteProvider>
                <CollectionProvider>
                    <Router>
                        <ApplicationViews />
                    </Router>    
                </CollectionProvider>
            </DeleteProvider>
        </UserProvider>
    </>
)

export default Lexicon