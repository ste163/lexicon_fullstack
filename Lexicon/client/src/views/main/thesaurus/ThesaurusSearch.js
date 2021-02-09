import React, { useContext, useState } from 'react'
import { ThesaurusContext } from '../../../providers/ThesaurusProvider'
import { SearchBar } from '../../../components/inputs/Inputs'

const ThesaurusSearch = () => {
    const { getWordFromThesaurus } = useContext(ThesaurusContext)
    const [ search, setSearch ] = useState("")

    const searchThesaurus = e => {
        e.preventDefault()
        // Checks for if there is just an empty string
        if (search.length !== 0) {
            // If there is more than an empty string, remove all spaces
            const trimmed = search.trim()
            // On the off chance there is just a bunch of spaces, do not add the word
            if (trimmed.length !== 0) {
                const lowered = trimmed.toLowerCase()
                getWordFromThesaurus(lowered)
                setSearch("")
            }    
        }
    }

    return (
        <section className="card card__color--white thesaurus__search">
            <form className="form__search" onSubmit={searchThesaurus}>
                <SearchBar
                    labelTitle={"Search Merriam-Webster's Collegiate Thesaurus"}
                    placeholderText={"Enter a word..."}
                    setSearchTerms={setSearch}/>

                    <button className="btn" type="submit">
                        Search
                    </button>
            </form>
        </section>
    )
}

export default ThesaurusSearch