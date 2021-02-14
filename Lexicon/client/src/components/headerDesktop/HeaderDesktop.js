import React from 'react'  
import Header from './header/Header'
import SubHeader from './subHeader/SubHeader'
// Container for desktop header components

const HeaderDesktop = ({
    isListColumnActive,
    isSelectedColumnActive,
    setIsSelectedColumnActive,
    setIsListColumnActive,
    selectedCollection,
    appSelectedRoute,
    history,
    collections }) => (
    <>
        <Header />
        <SubHeader
            isSelectedColumnActive={isSelectedColumnActive}
            isListColumnActive={isListColumnActive}
            setIsSelectedColumnActive={setIsSelectedColumnActive}
            setIsListColumnActive={setIsListColumnActive}
            selectedCollection={selectedCollection}
            appSelectedRoute={appSelectedRoute}
            history={history}
            collections={collections} />
    </>
)

export default HeaderDesktop