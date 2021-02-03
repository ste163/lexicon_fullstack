export const Warning = () => 'DEFAULT WARNING MSG'


// Registration
export const RegSuccess = () => "Registered! Welcome to Lexicon."

export const RegFail = () => "This email has already been registered."

export const LoginWelcome = () => "Welcome to Lexicon!"

export const LoginError = () =>  "Invalid email or password."

export const AnonWelcome = () =>  "Welcome! As an anonymous user, you can not save data."

export const AnonError = () => "Unable to sign in anonymously."

export const AnonWarning = () => "Anonymous users can not save data."

export const Logout = () => "Logout successful."


// Collections
export const CollectionRetrieveFailure = () => "Unable to retrieve collections."

export const CollectionAddSuccess = (name) => `Added collection ${name}`

export const CollectionAddFailure = () => "Unable to add collection."

export const CollectionAddFailureName = () => "You already have a collection with that name."


// Deleting
export const DeleteSuccessful = stringName => `Successfully deleted ${stringName}.`

export const DeleteFailure = stringType => `Unable to delete ${stringType}.`


// Connection error message
export const DbNoConnection = () => "Could not connect to Lexicon's database."