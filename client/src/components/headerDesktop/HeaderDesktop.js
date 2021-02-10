import React from 'react'  
import Header from './header/Header'
import SubHeader from './subHeader/SubHeader'

const HeaderDesktop = ({
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
            setIsSelectedColumnActive={setIsSelectedColumnActive}
            setIsListColumnActive={setIsListColumnActive}
            selectedCollection={selectedCollection}
            appSelectedRoute={appSelectedRoute}
            history={history}
            collections={collections} />
    </>
)

export default HeaderDesktop