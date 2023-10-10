import {getFilesFromLocalStorage, renderLastEditedFile, renderMarkdownContent, renderFilesInfoToSidebar, handleMenuBtn, handleSaveChangesBtn, handleNewDocBtn} from '/scripts/functions.js'

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

    if ( e.target.id === "hdr-menu-icon" ) {
        handleMenuBtn()
    }
    if ( e.target.id === "save-doc-btn" ) {
        handleSaveChangesBtn()
    }
    if ( e.target.id === "newdoc-btn" ) {
        handleNewDocBtn()
    }
})