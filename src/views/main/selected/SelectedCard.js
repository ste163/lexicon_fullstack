import React, { useState, useEffect } from "react"
import { WordButton, DeleteWordButton } from '../../../components/buttons/Buttons'
import { SearchBar } from '../../../components/inputs/Inputs'
import { WordDeleteRoute } from "../../../utils/Routes"
import "./SelectedCard.css"
// Dashboard column holding currently selected collection

const SelectedCard = ({ selectedCollection, getWordFromThesaurus, history }) => {
    const [ isDeletingWords, setIsDeletingWords ] = useState(false)
    const [ searchTerms, setSearchTerms ] = useState("")
    const [ filteredWords, setFilteredWords ] = useState([])

    useEffect(() => {
        if (searchTerms !== "") {
            const matches = selectedCollection.words.filter(c => c.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFilteredWords(matches)
        } else {
            // no terms in search bar, so display all and reset filtered items
            const words = [...selectedCollection.words]
            const sorted = sortedAlphabetically(words)
            setFilteredWords(sorted)
        }
    }, [searchTerms, selectedCollection])
    
    const sortedAlphabetically = (words) => {
        const sorted = words.sort((a,b) => {
            const wordA = a.name.toLowerCase()
            const wordB = b.name.toLowerCase()
            if (wordA < wordB) {
                return -1
            }
            if (wordB > wordA) {
                return 1
            }
            return 0
        })
        return sorted
    }

    return (
        <article className="card card__color--white card__selected">
            {/* <SelectedDotMenu ref={dotMenu} collection={selectedCollection} /> */}
    
            <div className="card__type">Selected Collection</div>
            <h1 className="selected__h1">{selectedCollection.collection.name}</h1>
            <p className="selected__description">{selectedCollection.collection.description}</p>
    
            <div className="selected__search">
                <SearchBar
                labelTitle={"Search for words in collection:"}
                placeholderText={"Search for word..."}
                setSearchTerms={setSearchTerms} />
            </div>
    
            {/* DROPDOWN FOR CATEGORIZATION TYPE */}
            {/* <fieldset className="selected__categorization">
                <label htmlFor="collectionSelect">Categorize by:</label>
                <select
                    name="collectionSelect"
                    id="collectionSelect"
                    defaultValue={"1"}
                    onChange={e => {
                        if (e.target.value === "1") {
                            const words = [...filteredWords]
                            const sorted = sortedAlphabetically(words)
                            setFilteredWords(sorted)
                        }
                        if (e.target.value === "2") {
                            const words = [...filteredWords]
                            const sorted = sortPartOfSpeech(words)
                            // setFilteredWords(sorted)
                        }
                    }} >
                    <option value="1">Alphabetically</option>
                    <option value="2">Part of Speech</option>
                </select>
            </fieldset> */}
    
            <hr className="selected__divider"></hr>
    
            {selectedCollection.words.length === 0 ? (
                <p className="selected__toggle">No words added yet.</p>
            ) : (
                <>
                    <fieldset className="selected__toggle">
                        <label className="label__wordDelete" htmlFor="isDeleting">Toggle deleting: </label>
                        <input
                            onChange={e => {setIsDeletingWords(e.currentTarget.checked)}}
                            checked={isDeletingWords}
                            type="checkbox"
                            id="isDeleting"
                            name="isDeleting"
                            value="isDeleting" />
                    </fieldset>
            
                    <section className="selected__words word__list definition__words">
                        {!isDeletingWords ? (
                            filteredWords.map(w => <WordButton
                                                            key={w.id}
                                                            word={w.name}
                                                            getWordFromThesaurus={getWordFromThesaurus}
                                                            isSelectedCard={true} />)
                        ) : (
                            filteredWords.map(w => <DeleteWordButton
                                                            key={w.id}
                                                            wordId={w.id}
                                                            word={w.name}
                                                            history={history}
                                                            deleteUrlToPushTo={WordDeleteRoute} />)
                        )}
                    </section>
                </>
            )}          
        </article>
    )
}

    
export default SelectedCard