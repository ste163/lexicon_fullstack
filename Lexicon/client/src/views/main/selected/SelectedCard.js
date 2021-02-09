import React, { useState } from "react"
import { WordButton, DeleteWordButton } from '../../../components/buttons/Buttons'
import { WordDeleteRoute } from "../../../utils/Routes"
import "./SelectedCard.css"

const SelectedCard = ({ selectedCollection, getWordFromThesaurus, history }) => {
    const [ isDeletingWords, setIsDeletingWords ] = useState(false)
console.log(selectedCollection)
    return (
        <article className="card card__color--white card__selected">
            {/* <SelectedDotMenu ref={dotMenu} collection={selectedCollection} /> */}
    
            <div className="card__type">
                Selected Collection
            </div>
            <h1 className="selected__h1">
                {selectedCollection.collection.name}
            </h1>
            <p className="selected__description">
                {selectedCollection.collection.description}
            </p>
    
            {/* 
                IF NO WORDS IN COLLECTION YET,
                INFORM USER TO SEARCH THESAURUS TO ADD WORDS
            */}
    
            {/* TO BE REPlACED BY THE SEARCH BAR COMPONENT */}
            <fieldset className="selected__search">
                <label htmlFor="collectionSearch">Search words in collection:</label>
                <input type="text"
                name="collectionSearch"
                className="input__search"
                placeholder="Search for word or part of speech... " />
            </fieldset>
    
            {/* DROPDOWN FOR CATEGORIZATION TYPE */}
            <fieldset className="selected__categorization">
                <label htmlFor="collectionSelect">Categorize by:</label>
                <select name="collectionSelect" id="collectionSelect">
                    <option value="1">Alphabetically</option>
                    <option value="2">Part of Speech</option>
                </select>
            </fieldset>
    
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
                            selectedCollection.words.map(w => <WordButton
                                                            key={w.id}
                                                            word={w.name}
                                                            getWordFromThesaurus={getWordFromThesaurus}
                                                            isSelectedCard={true} />)
                        ) : (
                            selectedCollection.words.map(w => <DeleteWordButton
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