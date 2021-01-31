import React, { useContext, useEffect, useState } from "react"
// import { CollectionContext } from "../../providers/CollectionProvider"
import ChangeColorMode from "../../utils/ChangeColorMode"

// Create Settings form to be passed into modal from header's gear icon

const SettingsForm = () => {

    return (
        <p>form</p>
    )
//     // Default settings from session storage
//     const userId = parseInt(sessionStorage.getItem("userId"))
//     const defaultCollection = sessionStorage.getItem("defaultCollection")
//     const TotalRecentsToStore = +sessionStorage.getItem("TotalRecentsToStore")
//     const addToMultiple = sessionStorage.getItem("addToMultiple")
//     const colorMode = sessionStorage.getItem("colorMode")

//     // Default settings to create
//     const defaultSettings = {
//         userId,
//         defaultCollection,
//         TotalRecentsToStore,
//         addToMultiple,
//         colorMode
//     }

//     const [ currentSettings, setCurrentSettings ] = useState(defaultSettings)
    
//     const { settings, getSettings, updateSettings } = useContext(SettingsContext)
//     const { collections } = useContext(CollectionContext)
    
//     const handleControlledInputChange = e => {
//         const newSetting = {...settings[0]}
//         newSetting[e.target.name] = e.target.value
//         setCurrentSettings(newSetting)
//     }

//     // Needed to populate the drop-downs and set colors
//     useEffect(() => {
//         getSettings(userId)
//         ChangeColorMode()
//     }, [collections])

//     // Wait for any settings to change, then re-run this code
//     // saving the new settings, storing the values in storage, and re-running the color mode script
//     useEffect(() => {
//         if (settings[0] !== undefined) {
//             updateSettings({
//                 id: settings[0].id,
//                 userId: userId,
//                 defaultCollection: +currentSettings.defaultCollection,
//                 TotalRecentsToStore: +currentSettings.TotalRecentsToStore,
//                 addToMultiple: currentSettings.addToMultiple,
//                 colorMode: currentSettings.colorMode
//             })
//             sessionStorage.setItem("defaultCollection", +currentSettings.defaultCollection) 
//             sessionStorage.setItem("TotalRecentsToStore", +currentSettings.TotalRecentsToStore) 
//             sessionStorage.setItem("colorMode", currentSettings.colorMode)
//             ChangeColorMode()
//         }
//     }, [currentSettings])

//     if (!settings[0]) {
//         return null
//     }

//     return (
//         <>
//         <div>
//             <form className="form__settings">
                    
//                 <fieldset className="settings__fieldset">
//                     <label htmlFor="defaultCollection">Set default collection:</label>
//                     <select
//                     id="defaultCollection"
//                     name="defaultCollection"
//                     value={settings[0].defaultCollection}
//                     onChange={handleControlledInputChange}>
//                         <option value="0">Select default collection</option>
//                         {collections.map(collection => (
//                             <option key={collection.id} value={collection.id}>
//                                 {collection.name}
//                             </option>
//                         ))}
//                     </select>
//                 </fieldset>
                
//                 <fieldset className="settings__fieldset">
//                     <label htmlFor="recents">Total recent searches to keep: </label>
//                     <input type="number" 
//                     name="TotalRecentsToStore"
//                     onChange={handleControlledInputChange}
//                     id="recents"
//                     defaultValue={+settings[0].TotalRecentsToStore}
//                     min="0"
//                     max="12"
//                     />
//                 </fieldset>

//                 <fieldset className="settings__fieldset">
//                     <label htmlFor="darkMode">Color theme:</label>
//                     <div className="radios">
//                         <input className="input__radio" type="radio" id="light" name="colorMode" value="light" required
//                         checked={settings[0].colorMode === "light" ? "light" : ""}
//                         onChange={handleControlledInputChange}
//                         />
//                         <label htmlFor="daily">Light</label>
                        
//                         <input className="input__radio" type="radio" id="dark" name="colorMode" value="dark" required
//                         checked={settings[0].colorMode === "dark" ? "dark" : ""}
//                         onChange={handleControlledInputChange}
//                         />
//                         <label htmlFor="weekly">Dark</label>
//                     </div>
//                 </fieldset>
//             </form>
//         </div>
//         <button className="btn"
//         onClick={e => e.currentTarget.parentElement.parentElement.parentElement.className = "background__modal"}>Close</button>
//         </>
//     )
}

export default SettingsForm