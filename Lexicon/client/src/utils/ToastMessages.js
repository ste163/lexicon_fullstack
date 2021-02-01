import React from 'react'

export const Warning = () => {
    return 'DEFAULT WARNING MSG'
}

export const RegSuccess = () => {
    return "Registered! Welcome to Lexicon."
}

export const RegFail = () => {
    return "This email has already been registered."
}

export const LoginWelcome = () => {
    return "Welcome to Lexicon!"
}

export const LoginError = () => {
    return "Invalid email or password."
}

export const AnonWelcome = () => {
    return "Welcome! As an anonymous user, you can not save data."
}

export const AnonError = () => {
    return "Error: unable to sign in anonymously."
}


export const DbNoConnection = () => {
    return "Could not connect to Lexicon's database."
}