// Registration
export const RegSuccess = () => "Registered! Welcome to Lexicon."

export const RegFail = () => "This email has already been registered."

export const LoginWelcome = () => "Welcome to Lexicon!"

export const LoginError = () =>  "Invalid email or password."

export const AnonWelcome = () =>  "Welcome! As an anonymous user, you can not save data."

export const AnonError = () => "Unable to sign in anonymously."

export const AnonWarning = () => "Anonymous users can not save data."

export const Logout = () => "Logout successful."


// Retrieving 
export const RetrieveFailure = objectType => `Unable to retrieve ${objectType}.`


// Adding
export const AddSuccess = (objectType, name) => `Added ${objectType} ${name}.`

export const AddFailure = objectType => `Unable to add ${objectType}.`

export const FailureNameDupe = objectType => `You already have a ${objectType} with that name.`


// Updating
export const UpdateSuccess = objectType => `Updated ${objectType}.`

export const UpdateFailure = objectType => `Unable to update ${objectType}.`


// Deleting
export const DeleteSuccessful = stringName => `Successfully deleted ${stringName}.`

export const DeleteFailure = stringType => `Unable to delete ${stringType}.`


// Connection error message
export const DbNoConnection = () => "Could not connect to Lexicon's database."