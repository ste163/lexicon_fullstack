import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './providers/UserProvider'
import ApplicationViews from './ApplicationViews'
import 'react-toastify/dist/ReactToastify.min.css'
import './Lexicon.css'

const Lexicon = () => (
    <>
        <ToastContainer position="top-center" hideProgressBar closeOnClick draggable />

        <UserProvider>
            <Router>
                <ApplicationViews />
            </Router>    
        </UserProvider>
    </>
)

export default Lexicon