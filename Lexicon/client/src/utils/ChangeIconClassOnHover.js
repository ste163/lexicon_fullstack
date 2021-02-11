// Util for changing Icon's SVG class on hover

export const ChangeIconClassOnHover = (hoverEvent, isOnMouseOver, initialClass, afterClass) => {
    // Must convert HTMLCollection of SVG elements to an Array to loop through children
    const svgs = Array.from(hoverEvent.currentTarget.firstElementChild.children[1].children)  
    // If isOnMouseOver is true, change classList; if false, revert
    if (isOnMouseOver) {
        svgs.forEach(svg => {                           
            svg.classList.remove(initialClass)
            svg.classList.add(afterClass)
        })      
    } else {
        // On mouseLeave event
        svgs.forEach(svg => {                           
            svg.classList.remove(afterClass)
            svg.classList.add(initialClass)
        })
    }
}