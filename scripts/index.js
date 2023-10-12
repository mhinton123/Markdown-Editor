import {getFilesFromLocalStorage, renderMarkdownContent, renderFile, handleMenuBtn, handleSaveChangesBtn, handleNewDocBtn, handleChangeFile, handleDeleteFileBtn, closeModal, handleConfirmDeleteBtn, handleThemeSlider, handleExportFileBtn, handlePreviewBtn} from '/scripts/functions.js'

const markdownInputEl = document.getElementById("markdown-input")


let previewHtml = ``

// On startup
let filesObjArr = getFilesFromLocalStorage()
renderFile(filesObjArr)

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
    else if ( e.target.id === "save-doc-btn" ) {
        handleSaveChangesBtn()
        
    }
    else if ( e.target.id === "newdoc-btn" ) {
        handleNewDocBtn()
    }
    else if ( e.target.id === "hdr-del-icon" ) {
        handleDeleteFileBtn()
    }
    else if ( e.target.id === "delete-modal-close-btn" ) {
        closeModal()
    }
    else if ( e.target.id === "delete-modal-btn" ){
        handleConfirmDeleteBtn()
    }
    else if ( e.target.id === "theme-slider" ) {
        handleThemeSlider()
    } 
    else if ( e.target.id === "export-file") {
        handleExportFileBtn()
    }
    else if ( e.target.id === "preview-icon" ) {
        handlePreviewBtn()
    }
    else if ( e.target && e.target.classList[0].includes('sb-doc') ) {
        const targetFileBtn = e.target.closest('.sb-doc-wr')
        handleChangeFile(targetFileBtn)
    }

})
