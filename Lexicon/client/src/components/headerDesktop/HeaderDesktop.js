import React from 'react'  
import Header from './header/Header'
import SubHeader from './subHeader/SubHeader'

// These will only show on the desktop header, will allow for easier switching between headers

const HeaderDesktop = () => (
    <>
        <Header />
        <SubHeader />
    </>
)

export default HeaderDesktop