import React from "react"
import "./LexLogo.css"

// To use logo
    // Assign a location prop: logo__login--lex, header, footer (from LexLogo.css)

const LexLogo = props => (
    <svg className={props.location} width="185" height="150" version="1.1" viewBox="0 0 48.948 39.688" xmlns="http://www.w3.org/2000/svg">
        <title>Lexicon Logo</title>
        <path id="tri_yellow" d="m34.539 0.033073c-23.026-0.022049-11.513-0.011024 0 0zm-9.9115 11.398-24.542 28.223h16.259l7.3246-10.08 7.0714-9.7307z" style={{fill:"#e4e485",paintOrder:"stroke fill markers", strokeLinecap:"round", strokeLinejoin:"round", strokeWidth:".10087"}}/>
        <path d="m20.07 0.033577 6.5867 9.063 5.29e-4 -5.291e-4 0.8692 1.1963 6.9407 9.5514 14.396-19.81h-28.792z" style={{fill:"#d64d4d", paintOrder:"stroke fill markers", strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:".050434"}}/>
        <path id="tri_red" d="m0.085055 0.033577 17.39 19.811 7.2884-8.2253-8.4191-11.585z" style={{fill:"#d64d4d", paintOrder:"stroke fill markers", strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:".050434"}}/>
        <path className={props.color} id="tri_black-white" d="m34.467 19.844-14.396 19.811h28.792z" style={{fill:"#171717", paintOrder:"stroke fill markers", strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:".050434"}}/>
        <path id="tri_orange" d="m24.709 11.544-7.2342 8.2998h13.265z" style={{fillOpacity:".57143",fill:"#d64d4d",paintOrder:"stroke fill markers",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:".021494"}}/>
    </svg>
)

export default LexLogo