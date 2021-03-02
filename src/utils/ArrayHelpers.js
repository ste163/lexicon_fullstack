// Assists with sorting array data

export const removeDuplicationFromArray = duplicationArray => {
    // make copy of original array
    const copyOfDuplicationArray = [...duplicationArray]
    // make holding array for unique matches
    const uniqueResultsArray = []

    // for each object in Duplication, filter matches from new Array to
    duplicationArray.forEach(obj => {
        let tempFilteredArray = copyOfDuplicationArray.filter(newObj => newObj.id === obj.id)
        
        //if tempFilteredArray is less than 2 add it to the result
        if (tempFilteredArray.length < 2){
            uniqueResultsArray.push(obj)}
    })

    return uniqueResultsArray
}

export const moveSingleItemsBetweenStateArrays = (e, itemsAvailableState, setItemsAvailableState, itemsAddedState, setItemsAddedToState) => {
    // Get what we clicked on by it's inner text
    const clickedItem = e.target.textContent
    // Pull that item from projectsAvailable
    const itemToAdd = itemsAvailableState.find(p => p.name === clickedItem)
    // Filter out the clicked on item from those available
    setItemsAvailableState(itemsAvailableState.filter(p => p.name !== itemToAdd.name))
    // Add the filtered out item to the array to add to
    setItemsAddedToState(itemsAddedState => [...itemsAddedState, itemToAdd])
}