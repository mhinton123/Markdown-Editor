import {getFilesFromLocalStorage, renderLastEditedFile, renderMarkdownContent, renderFilesInfoToSidebar, handleMenuBtn, handlesaveChangesBtn} from '/scripts/functions.js'

const markdownInputEl = document.getElementById("markdown-input")


let previewHtml = ``

// On startup
let markdownFilesData = getFilesFromLocalStorage()
renderLastEditedFile(markdownFilesData)
renderFilesInfoToSidebar(markdownFilesData)

// Runs everytime the user edits the input area
markdownInputEl.addEventListener("input", function(e){
    
    previewHtml =''
    renderMarkdownContent(previewHtml)

})

// Handles any buttons clicked on the page
document.addEventListener("click", function(e) {

    const saveChangesBtn = document.getElementById("save-doc-btn")
    const menuIconEl = document.getElementById("hdr-menu-icon")

    if ( e.target === menuIconEl ) {
        handleMenuBtn()
    }
    if ( e.target === saveChangesBtn ) {
        handlesaveChangesBtn()
    }
})