import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import Lexicon from './Lexicon'
// Index.js is Lexicon's entry point

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
      <Lexicon />
  </React.StrictMode>,
  document.getElementById('root')
)