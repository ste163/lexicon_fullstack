import React, { useContext, useRef, useState } from 'react'
import { useHistory } from "react-router-dom"
import LexLogo from '../../components/branding/LexLogo'
import LexTitle from '../../components/branding/LexTitle'
import ChangeColorMode from '../../utils/ChangeColorMode'
import './AuthView.css'

const AuthView = () => {

    // If logging out with dark mode active, this resets colors to white 
    ChangeColorMode()

    // Get references for all of the elements that will change
    // Input Fields
    const usernameLogin = useRef()
    const usernameRegister = useRef()
    const passwordLogin = useRef()
    const passwordRegister = useRef()

    // Nav Buttons
    const loginBtn = useRef()
    const registerBtn = useRef()

    const history = useHistory()

    // To allow for the nav underline to move, target it by useRef
    const underline = useRef()
    const [activeBtn, setBtn] = useState(true)

    // // Fetch for only login field
        // const existingUserCheckLogin = () => {
        //     return fetch(`http://localhost:8088/users?username=${usernameLogin.current.value}`)
        //         .then(res => res.json())
        //         .then(user => user.length ? user[0] : false)
        // }

    // // Fetch for only register field
        // const existingUserCheckRegister = () => {
        //     return fetch(`http://localhost:8088/users?username=${usernameRegister.current.value}`)
        //         .then(res => res.json())
        //         .then(user => user.length ? user[0] : false)
        // }
    
    const handleLogin = (e) => {
        e.preventDefault()

        // existingUserCheckLogin()
        //     .then(exists => {
        //         if (exists) {
        //             sessionStorage.setItem("userId", exists.id)
        //             getSettingsOnLogin(exists.id)
        //             .then(settingsExists => {
        //                 if (settingsExists) {
        //                     sessionStorage.setItem("defaultCollection", settingsExists[0].defaultCollection)
        //                     sessionStorage.setItem("TotalRecentsToStore", settingsExists[0].TotalRecentsToStore)
        //                     sessionStorage.setItem("addToMultiple", settingsExists[0].addToMultiple)
        //                     sessionStorage.setItem("colorMode", settingsExists[0].colorMode)
        //                 }
        //                 history.push("/app")
        //             })
        //         } else {
        //             existDialog.current.className = "background__modal modal__active"
        //         }
        //     })
    }
    
    const handleRegister = (e) => {
        e.preventDefault()

        // existingUserCheckRegister()
        // .then((userExists) => {
        //     if (!userExists) {
        //         fetch("http://localhost:8088/users", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 username: usernameRegister.current.value,
        //             })
        //         })
        //             .then(_ => _.json())
        //             .then(createdUser => {
        //                 if (createdUser.hasOwnProperty("id")) {
        //                     sessionStorage.setItem("userId", createdUser.id)
        //                     // Should move the actual default settings into the default settings function.
        //                     addDefaultSettings(createdUser)
        //                         .then(() => {
        //                             sessionStorage.setItem("defaultCollection", 0)
        //                             sessionStorage.setItem("TotalRecentsToStore", 6)
        //                             sessionStorage.setItem("addToMultiple", true)
        //                             sessionStorage.setItem("colorMode", "light")
        //                             history.push("/")
        //                     })
        //                 }
        //             })
        //     } else {
        //         conflictDialog.current.className = "background__modal modal__active"
        //     }
        // })
    }  

    return (
        <main className="auth__container">    

            <div className="border__top" />

            <div className="auth__column--middle">
                <div className="auth__branding">
                    <LexLogo location={"logo__login--lex"}/>
                    <LexTitle location={"title__login"} />
                    <h2 className="subtitle">
                        Create custom word collections<br/>
                        using Merriam-Webster's Collegiate<sup>&#174;</sup> Thesaurus
                    </h2>
                </div>

                <section className="card card__color--white card__auth">
                    <ul  className="auth__btns">
                        
                        <li className="btns__li">
                            <button
                            className={activeBtn ? "auth__btn auth__btn--active" : "auth__btn"}
                            onClick={e => {
                                setBtn(true)
                                if (usernameRegister.current !== undefined && usernameRegister.current !== null) {
                                    usernameRegister.current.value = ""
                                }
                                if (passwordRegister.current !== undefined && passwordRegister.current !== null) {
                                    passwordRegister.current.value = ""
                                }
                            }}
                            onMouseEnter={e => underline.current.className = "auth__line line__login--active"}
                            onMouseLeave={e => underline.current.className = `auth__line ${activeBtn ? "line__login--active" : "line__register--active"}`}>
                                Log in
                            </button>
                        </li>
                        
                        <li className="btns__li">
                            <button
                            className={activeBtn ? "auth__btn" : "auth__btn auth__btn--active"}
                            onClick={e => {
                                setBtn(false)
                                if (usernameLogin.current !== undefined && usernameLogin.current !== null) {
                                    usernameLogin.current.value = ""
                                }
                                if (passwordLogin.current !== undefined && passwordLogin.current !== null) {
                                    passwordLogin.current.value = ""
                                }
                            }}
                            onMouseEnter={e => underline.current.className = "auth__line line__register--active"}
                            onMouseLeave={e => underline.current.className = `auth__line ${activeBtn ? "line__login--active" : "line__register--active"}`}>
                                Register
                            </button>
                        </li>
                        
                        {/* Underline under Nav btns */}
                        <div ref={underline} className={`auth__line ${activeBtn ? "line__login--active" : "line__register--active"}`}></div>
                    
                    </ul>

                    <section>
                        <form className="form"
                        onSubmit={activeBtn ? handleLogin : handleRegister}>

                            <fieldset>
                                {/* Need to change type to email in final version, along with renaming the labels */}
                                <label htmlFor={activeBtn ? "usernameLogin" : "usernameRegister"}>Email</label>
                                <input
                                    className="input--auth"
                                    ref={activeBtn ? usernameLogin : usernameRegister} type="text"
                                    id={activeBtn ? "usernameLogin" : "usernameRegister"}
                                    placeholder="user@email.com"
                                    required
                                    autoFocus />
                            </fieldset>
                            
                            <fieldset>
                                <label htmlFor={activeBtn ? "passwordLogin" : "passwordRegister"}>Password</label>
                                <input
                                    className="input--auth"
                                    ref={activeBtn ? passwordLogin : passwordRegister} type="password"
                                    id={activeBtn ? "passwordLogin" : "passwordRegister"}
                                    placeholder="password"
                                    required
                                    autoFocus />
                            </fieldset>

                            <fieldset className="fieldset__btn">
                                <button 
                                ref={loginBtn}
                                className={`btn btn--green btn__authSubmit ${activeBtn ? "login__active" : " login__inactive"}`}
                                type="submit">Login</button>
                                <button
                                ref={registerBtn} 
                                className={`btn btn--green btn__authSubmit ${activeBtn ? "register__inactive" : "register__active"}`}
                                type="submit">Register</button>
                            </fieldset>

                        </form>
                            <button>Continue without signing in</button>
                    </section>
                </section>
            </div>

            <div className="border__bottom" />

        </main>
    )
}

export default AuthView