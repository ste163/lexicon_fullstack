// Change CSS property values on the :root for light & dark mode
const ChangeColorMode = () => {
    const root = document.documentElement.style
    const colorMode = sessionStorage.getItem('colorMode')

    if (colorMode !== 'dark') {
        root.setProperty('--yellow', '#fbfbbe')
        root.setProperty('--lightYellow', '#ffffdb')
        root.setProperty('--darkYellow', '#f5f5b6')
        root.setProperty('--fontColor', '#333333')
        root.setProperty('--offWhite', '#FCFCFC')
        root.setProperty('--black', 'rgb(7, 7, 7)')
        root.setProperty('--lightBlack', '#171717ff')
        root.setProperty('--lightGray', '#F6F6F6')
        root.setProperty('--mediumGray', '#f1f1f1')
        root.setProperty('--fontColorInactive', '#cacaca')
        root.setProperty('--fontColorBtn', '#FCFCFC')
    } else if (colorMode === 'dark') {
        root.setProperty('--yellow', '#5e5e2c')
        root.setProperty('--lightYellow', '#6a6c36')
        root.setProperty('--darkYellow', '#53532d')
        root.setProperty('--fontColor', 'white')
        root.setProperty('--offWhite', '#1e1e1e')
        root.setProperty('--black', 'rgb(195, 195, 195)')
        root.setProperty('--lightBlack', 'white')
        root.setProperty('--lightGray', '#2c2b2b')
        root.setProperty('--mediumGray', '#2d2c2c')
        root.setProperty('--fontColorInactive', '#4a4a4a')
        root.setProperty('--fontColorBtn', '#333333')
    }
}

export default ChangeColorMode