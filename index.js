const menuIconEl = document.getElementById("hdr-menu-icon")
const sidebarDivEl = document.getElementById("sb-wr")
const markdownInputEl = document.getElementById("markdown-input")
const previewDivEl = document.getElementById("preview-content")

let previewHtml = ``

// Markdown input
markdownInputEl.addEventListener("input", function(e){
    
    previewHtml = ``

    const markdownText = e.target.value
    parseMarkdownText(markdownText)
    
    render()

})

// Btn click
document.addEventListener("click", function(e) {
    if ( e.target === menuIconEl ) {
        handleMenuBtn()
    }
})

function parseMarkdownText(markdownText) {
    
    const textTolineArr = markdownText.split('\n')
    let isCode = false
    
    textTolineArr.forEach((line, index) => {
             
        // Check for headings
        if (line.startsWith("# ")) {
            line = line.substring(2)
            previewHtml += `<h1 class="p-h1">${line}</h1>`
        } 
        else if (line.startsWith("## ")){
            line = line.substring(3)
            previewHtml += `<h2 class="p-h2">${line}</h2>`
        }
        else if (line.startsWith("### ")){
            line = line.substring(4)
            previewHtml += `<h3 class="p-h3">${line}</h3>`
        }
        else if (line.startsWith("#### ")){
            line = line.substring(5)
            previewHtml += `<h4 class="p-h4">${line}</h4>`
        }
        else if (line.startsWith("##### ")){
            line = line.substring(6)
            previewHtml += `<h5 class="p-h5">${line}</h5>`
        }
        else if (line.startsWith("###### ")){
            line = line.substring(7)
            previewHtml += `<h6 class="p-h6">${line}</h6>`
        }
        // Check for ordered lists
        else if (typeof parseInt(line[0]) === 'number' & line[1] === '.'){
            line = line.substring(3)
            previewHtml += formatListItems(line, index, textTolineArr, "ol")

        }
        else if (typeof parseInt(line[0]) === 'number' && typeof parseInt(line[0]) === 'number'&& line[2] === '.') {
            line = line.substring(4)
            previewHtml += formatListItems(line, index, textTolineArr, "ol")
  
        }
        // Check for unordered lists
        else if (line.startsWith("- ")){
            line = line.substring(2)
            previewHtml += formatListItems(line, index, textTolineArr, "ul")
            
        }
        // Check for blockquote    TODO (look into inline links for this)
        else if (line.startsWith("> ")){
            line = line.substring(2)
            previewHtml += `<p class="p-blockquote">${line}</p>`
        }
        // Check for start of a code block
        else if (line.startsWith("```") && isCode === false){
            console.log("The string starts with '```'.");
            isCode = true
        }
        // Check for end of a code block
        else if (line.startsWith("```") && isCode === true){
            console.log("The string starts with '```'.");
            isCode = false
        }
        // Check for line of code
        else if (isCode === true){
            console.log(line + " is a line of code")
        }
        // Check for <br>
        else if (line === ''){
            console.log("<br>")
        }
        // Anything else is body text
        else{
            console.log("this is body text")
        }

    })
}


function formatListItems(innerText, index, textTolineArr, listType) {
    
    const previousLine = textTolineArr[index-1]
    const nextLine = textTolineArr[index+1]
    let listItem = `<li>${innerText}</li>`

    if ( listType === "ol" ){
        // if prev line is undefined or !li  ->  add <ol class="p-ol"> to list item
        if (previousLine != undefined){
            if ((!(typeof parseInt(previousLine[0]) === 'number' && previousLine[1] === '.')) && (!(typeof parseInt(previousLine[0]) === 'number' && previousLine[2] === '.')))
                listItem = `<ol class="p-ol">` + listItem
        }
        else {
            listItem = `<ol class="p-ol">` + listItem
        }

        // if next line is undefined or !li -> add </ol> to end of list item
        if (nextLine != undefined){
            if ((!(typeof parseInt(nextLine[0]) === 'number' && nextLine[1] === '.')) && (!(typeof parseInt(nextLine[0]) === 'number' && nextLine[2] === '.')))
                listItem = listItem + `</ol>`
        }
        else {
            listItem = listItem + `</ol>` 
        }

        return listItem
    }
    

    if ( listType === "ul" ){
        // if prev line is undefined or !li  ->  add <ul class="p-ul"> to list item
        if (previousLine != undefined){
            if ((!previousLine.startsWith("- ")))
            listItem = `<ul class="p-ul">` + listItem
        }
        else {
            listItem = `<ul class="p-ul">` + listItem
        }

        // if next line is undefined or !li  ->  add </ul> to end of list item
        if (nextLine != undefined){
            if ((!nextLine.startsWith("- ")))
            listItem = listItem + `</ul>`
        }
        else {
            listItem = listItem + `</ul>` 
        }

        return listItem

    }

}


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