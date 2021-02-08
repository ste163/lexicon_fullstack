import React, { useContext, useState } from 'react'
import { ThesaurusContext } from '../../../providers/ThesaurusProvider'
import { SearchBar } from '../../../components/inputs/Inputs'

const ThesaurusSearch = () => {
    const { word, getWord } = useContext(ThesaurusContext)
    const [ search, setSearch ] = useState("")

    return (
        <section className="card card__color--white">
            <SearchBar
                labelTitle={"Search Merriam-Webster's Collegiate Thesaurus"}
                placeholderText={"Enter a word..."}
                setSearchTerms={setSearch}/>
        </section>
    )
}

export default ThesaurusSearch