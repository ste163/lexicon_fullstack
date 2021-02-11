import React from 'react'
import { LexLogo, LexTitle, MwLogo } from '../branding/Branding'
import './Footer.css'
// Static content to render the footer

const Footer = () => (
    <footer>
        <div className="footer__row1">

            <section className="footer__branding">
                <LexLogo location={"logo__footer--lex"} color={"logo__black"} />
                <LexTitle location={"title__footer"} color={"title__black"} />
                <MwLogo location={"logo__footer--mw"} />
            </section>

            <section className="footer__summary">
                <h2 className="footer__heading">Summary</h2>
                <p className="footer__p">
                    Lexicon allows writers to easily search for and store words from Merriam-Webster's Collegiate<sup>&#174;</sup> Thesaurus.
                </p>
            </section>

            <section className="footer__about">
                <h2 className="footer__heading">About</h2>
                <div>
                    <p className="footer__p">
                        Lexicon was created by Sam Edwards, a creative writer and software developer.
                    </p>
                    <div>
                        <a className="footer__p" href="https://www.linkedin.com/in/st-edwards">LinkedIn</a>
                    </div>
                    <div>
                        <a className="footer__p" href="https://github.com/ste163">Github</a>
                    </div>
                </div>
            </section>

            <section className="footer__tech">
                <h2 className="footer__heading">Technologies Used</h2>
                <div className="footer__lists">
                    
                    <div>
                        <h3 className="footer__subHeading">Development</h3>
                        <ul className="tech__list">
                        <h4 className="footer__subHeading">Backend</h4>
                            <li className="tech__item"><a href="https://dotnet.microsoft.com/">.NET</a></li>
                            <li className="tech__item"><a href="https://visualstudio.microsoft.com/">Visual Studio 2019</a></li>
                        <h4 className="footer__subHeading">Frontend</h4>                   
                            <li className="tech__item"><a href="https://reactjs.org/">React</a></li>
                            <li className="tech__item"><a href="https://code.visualstudio.com/">VS Code</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer__list">
                        <h3 className="footer__subHeading">Design</h3>
                        <ul className="tech__list">
                            <li className="tech__item"><a href="https://inkscape.org/">Inkscape</a></li>
                            <li className="tech__item"><a href="https://dribbble.com/">Dribbble</a></li>
                            <li className="tech__item"><a href="https://developer.paciellogroup.com/resources/contrastanalyser/">Colour Contrast Analyser</a></li>
                        </ul>
                    </div>
                
                </div>
            </section>
        </div>

        <div className="footer__row2">
            &#169; 2021 Sam Edwards
        </div>

    </footer>
)

export default Footer