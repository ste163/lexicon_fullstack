import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ApplicationViews from './ApplicationViews'
import 'react-toastify/dist/ReactToastify.min.css'

const Lexicon = () => (
    <>
        <ToastContainer position="top-center" hideProgressBar closeOnClick draggable />
        {/*
            Wrap the Router in all providers
            this way ApplicationViews will be cleaner
        */}
        <Router>
            <ApplicationViews />
        </Router>
    </>
)

export default Lexicon