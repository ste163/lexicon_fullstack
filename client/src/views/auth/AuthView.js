import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppRoute } from '../../utils/Routes'
import { LoginWelcome, LoginError, RegSuccess, RegFail, AnonWelcome, AnonError } from '../../utils/ToastMessages'
import { UserContext } from '../../providers/UserProvider'
import { LexLogo, LexTitle } from '../../components/branding/Branding'
import ChangeColorMode from '../../utils/ChangeColorMode'
import './AuthView.css'

const AuthView = () => {
    // If logging out with dark mode active, this resets colors to white 
    ChangeColorMode()

    const { login, anonymousLogin, register } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    // To allow for the nav underline to move, target it by useRef
    const [activeBtn, setBtn] = useState(true)

    // Get references for all of the elements that will change
    // Nav Buttons
    const loginBtn = useRef()
    const registerBtn = useRef()
    const underline = useRef()

    const history = useHistory()

    const handleRegister = (e) => {  
        e.preventDefault()
        setLoading(true)
        const user = {
            email: registerEmail,
        }
        register(user, registerPassword)
            .then(user => {
                setLoading(false)
                // Store default settings in sessionStorage
                // Use the user.id as the key to know who's settings to load
                toast.success(RegSuccess())
                history.push(AppRoute())
            })
            .catch(err => {
                if (err.code !== undefined) {
                    toast.error(RegFail())
                }
                setLoading(false)
            })
    }  

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        login(loginEmail, loginPassword)
            .then(user => {
                toast.info(LoginWelcome())
            })
            .catch(err => {
                setLoading(false)
                toast.error(LoginError())
            })
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
                        {/* LOGIN BTN */}
                        <li className="btns__li">
                            <button
                            className={activeBtn ? "auth__btn auth__btn--active" : "auth__btn"}
                            onClick={e => {
                                setBtn(true)
                                if (registerEmail) {                                 
                                    setLoginEmail("")
                                }
                                if (registerPassword) {                                
                                    setLoginPassword("")
                                }
                            }}
                            onMouseEnter={e => underline.current.className = "auth__line line__login--active"}
                            onMouseLeave={e => underline.current.className = `auth__line ${activeBtn ? "line__login--active" : "line__register--active"}`}>
                                Log in
                            </button>
                        </li>
                        {/* REGISTER BTN */}
                        <li className="btns__li">
                            <button
                            className={activeBtn ? "auth__btn" : "auth__btn auth__btn--active"}
                            onClick={e => {
                                setBtn(false)
                                if (loginEmail) {
                                    setLoginEmail("")
                                }
                                if (loginPassword) {
                                    setLoginPassword("")
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

                    <section className="auth__form">
                        <form
                        className="form"
                        onSubmit={activeBtn ? handleLogin : handleRegister}>

                            <fieldset>
                                <label htmlFor={activeBtn ? "emailLogin" : "usernameRegister"}>Email</label>
                                <input
                                    className="input--auth"
                                    type="email"
                                    id={activeBtn ? "emailLogin" : "usernameRegister"}
                                    value={activeBtn ? loginEmail : registerEmail}
                                    onChange={e => {
                                        if (activeBtn) {
                                            setLoginEmail(e.target.value)
                                        } else {
                                            setRegisterEmail(e.target.value)
                                        }
                                    }}
                                    placeholder="user@email.com"
                                    required
                                    autoFocus />
                            </fieldset>
                            
                            <fieldset>
                                <label htmlFor={activeBtn ? "passwordLogin" : "passwordRegister"}>Password</label>
                                <input
                                    className="input--auth"
                                    id={activeBtn ? "passwordLogin" : "passwordRegister"}
                                    value={activeBtn ? loginPassword : registerPassword}
                                    onChange={e => {
                                        if (activeBtn) {
                                            setLoginPassword(e.target.value)
                                        } else {
                                            setRegisterPassword(e.target.value)
                                        }
                                    }}
                                    placeholder="password"
                                    type="password"
                                    minLength={6}
                                    required
                                    autoFocus />
                            </fieldset>
                            
                            {/* If Loading, show spinner instead of button */}
                            {loading ? (
                                <div className="spinner__card">
                                    <div className="cls-spinner cls-spinner--card">
                                        <div className="cls-circle cls-spin"></div>
                                    </div>
                                </div>
                            ) : (
                                <fieldset className="fieldset__btn auth__submit">
                                    <button 
                                    ref={loginBtn}
                                    disabled={loading}
                                    className={`btn btn__authSubmit ${activeBtn ? "login__active" : " login__inactive"}`}
                                    type="submit">
                                        Login
                                    </button>
                                    <button
                                    ref={registerBtn} 
                                    disabled={loading}
                                    className={`btn btn__authSubmit ${activeBtn ? "register__inactive" : "register__active"}`}
                                    type="submit">
                                        Register
                                    </button>
                                </fieldset>
                            )}

                        </form>

                        <button
                        onClick={e => {
                            anonymousLogin()
                            .then(user => {
                                toast.info(AnonWelcome())
                                history.push(AppRoute())
                            })
                            .catch(err => {
                                toast.error(AnonError())
                            })
                        }}
                        className="btn__no-style">
                            Continue without signing in
                        </button>
                    </section>
                </section>

            </div>
            <div className="border__bottom" />
        </main>
    )
}

export default AuthView