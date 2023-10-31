import * as m from '/scripts/functions.js'

const markdownInputEl = document.getElementById("markdown-input")
const fileNameInputEl = document.getElementById("file-name")
let previewHtml = ``

// On startup
const filesObjArr = m.getFilesFromLocalStorage()
m.renderFile(filesObjArr)

// Runs everytime the user edits the markdon input area
markdownInputEl.addEventListener("input", function(e){
    
    // Show save btn
    const saveBtn = document.getElementById("save-doc-btn")
    saveBtn.style.display = "flex"
    
    // Render markdown -> preview
    previewHtml =''
    m.renderMarkdownContent(previewHtml)
})

// Show save button if file name is edited
fileNameInputEl.addEventListener("input", function(e){
    
    const saveBtn = document.getElementById("save-doc-btn")
    saveBtn.style.display = "flex"
})


// Handles any buttons on the page
document.addEventListener("click", function(e) {

    if ( e.target.id === "hdr-menu-icon" ) {
        m.handleMenuBtn()
    }
    else if ( e.target.id === "save-doc-btn" ) {
        m.handleSaveChangesBtn()
        
    }
    else if ( e.target.id === "newdoc-btn" ) {
        m.handleNewDocBtn()
    }
    else if ( e.target.id === "hdr-del-icon" ) {
        m.handleDeleteFileBtn()
    }
    else if ( e.target.id === "delete-modal-close-btn" ) {
        m.closeModal()
    }
    else if ( e.target.id === "delete-modal-btn" ){
        m.handleConfirmDeleteBtn()
    }
    else if ( e.target.id === "theme-slider" ) {
        m.handleThemeSlider()
    } 
    else if ( e.target.id === "export-file") {
        m.handleExportFileBtn()
    }
    else if ( e.target.id.includes("preview-icon")  ) {
        m.handlePreviewBtn()
    }
    else if ( e.target && e.target.classList[0].includes('sb-doc') ) {
        const targetFileBtn = e.target.closest('.sb-doc-wr')
        m.handleChangeFile(targetFileBtn)
    }

})
