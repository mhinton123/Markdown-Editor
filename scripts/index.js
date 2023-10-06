import {parseMarkdownText} from '/scripts/functions.js'

const menuIconEl = document.getElementById("hdr-menu-icon")
const sidebarDivEl = document.getElementById("sb-wr")
const markdownInputEl = document.getElementById("markdown-input")
const previewDivEl = document.getElementById("preview-content")

let previewHtml = ``

// Runs everytime the user edits the input area
markdownInputEl.addEventListener("input", function(e){
    
    previewHtml = ``

    const markdownText = e.target.value
    previewHtml += parseMarkdownText(markdownText)
    
    render()

})

// Handles any buttons clicked on the page
document.addEventListener("click", function(e) {
    if ( e.target === menuIconEl ) {
        handleMenuBtn()
    }
})

function handleMenuBtn() {

    // Check open/close state
    if ( menuIconEl.src.includes("/assets/icon-menu.svg") ) {
        
        // Show sidebar
        sidebarDivEl.style.display = "flex"

        // Change hamburger icon to 'X'
        menuIconEl.src = "/assets/icon-close.svg"
    
    }
    else {

        // Close sidebar
        sidebarDivEl.style.display = "none"

        // Change hamburger icon to 'X'
        menuIconEl.src = "/assets/icon-menu.svg"
    
    }

}

function render() {
    previewDivEl.innerHTML = previewHtml
}

render()