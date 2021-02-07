import React from "react"
// import SelectedCardNone from "./SelectedCardNone"
// import SelectedDotMenu from "./SelectedDotMenu"
import "./SelectedCard.css"

const SelectedCard = ({ selectedCollection }) => (
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

        <section className="selected__words word__list definition__words">
            {/* {
                // Organize into buttons by alphabetical. With option for by part of speech
                // Will probably need to store the part of speech in db for quick sorting
                    // Organize part of speech alphabetically
                wordsInCollection.map(w => <WordButton key={w.id} props={{word: w.word, isSelectedCard: true}} />)
            } */}
        </section>

    </article>
)
    
export default SelectedCard