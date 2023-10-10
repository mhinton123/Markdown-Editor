const menuIconEl = document.getElementById("hdr-menu-icon")
const sidebarDivEl = document.getElementById("sb-wr")

function stripHtmlBrackets(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Formats each line of input based on markdown syntax
export function parseMarkdownText(markdownText) {
    
    const textTolineArr = markdownText.split('\n')
    let isCode = false
    let html = ''
    
    textTolineArr.forEach((line, index) => {
             
        // Check for headings
        if (line.startsWith("# ")) {
            line = line.substring(2)
            line = stripHtmlBrackets(line)
            html += `<h1 class="p-h1">${line}</h1>`
        } 
        else if (line.startsWith("## ")){
            line = line.substring(3)
            line = stripHtmlBrackets(line)
            html += `<h2 class="p-h2">${line}</h2>`
        }
        else if (line.startsWith("### ")){
            line = line.substring(4)
            line = stripHtmlBrackets(line)
            html += `<h3 class="p-h3">${line}</h3>`
        }
        else if (line.startsWith("#### ")){
            line = line.substring(5)
            line = stripHtmlBrackets(line)
            html += `<h4 class="p-h4">${line}</h4>`
        }
        else if (line.startsWith("##### ")){
            line = line.substring(6)
            line = stripHtmlBrackets(line)
            html += `<h5 class="p-h5">${line}</h5>`
        }
        else if (line.startsWith("###### ")){
            line = line.substring(7)
            line = stripHtmlBrackets(line)
            html += `<h6 class="p-h6">${line}</h6>`
        }

        // Check for ordered lists
        else if (typeof parseInt(line[0]) === 'number' & line[1] === '.'){
            line = line.substring(3)
            line = stripHtmlBrackets(line)
            line = checkForInlineCode(line)
            html += formatListItems(line, index, textTolineArr, "ol")

        }
        else if (typeof parseInt(line[0]) === 'number' && typeof parseInt(line[0]) === 'number'&& line[2] === '.') {
            line = line.substring(4)
            line = stripHtmlBrackets(line)
            line = checkForInlineCode(line)
            html += formatListItems(line, index, textTolineArr, "ol")
  
        }

        // Check for unordered lists
        else if (line.startsWith("- ")){
            line = line.substring(2)
            line = stripHtmlBrackets(line)
            line = checkForInlineCode(line)
            html += formatListItems(line, index, textTolineArr, "ul")
            
        }

        // Check for blockquote    TODO (look into inline links for this)
        else if (line.startsWith("> ")){
            line = line.substring(2)
            html += formatBlockQuote(line)
        }

        // Check for start of a code block
        else if (line.startsWith("```") && isCode === false){
            html += `<div class="p-codeblock"><pre>`
            isCode = true
        }

        // Check for end of a code block
        else if (line.startsWith("```") && isCode === true){
            html += `</div></pre>`
            isCode = false
        }

        // Check for line of code
        else if (isCode === true){
            html += formatCodeblocksLine(line)
        }

        // Check for <br>
        else if (line === ''){
            html += `<br>`
        }

        // Anything else is body text
        else{
            line = stripHtmlBrackets(line)
            line = checkForInlineCode(line)
            html += `<p class="p-para">${line}</p>`
        }

    })

    return html
}

// Nests list items in ol / ul tags based on its postion in htmlS
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

// add the link in <a> tags with href
function formatBlockQuote(line) {

    let blockquoteName = line.match(/\[(.*?)\]/g)
    let blockquoteLink = line.match(/\((.*?)\)/g); 
    line = stripHtmlBrackets(line)

    if (blockquoteName && blockquoteLink) {
        
        // Format name
        let extractedNameText = blockquoteName.map(name => name.slice(1, -1));
        line = line.replace(blockquoteName[0], `<a class="p-link" href="~%#LINK HERE#%~" target="_blank">${extractedNameText}</a>`)
        
        // Format link
        let extractedLinkText = blockquoteLink.map(link => link.slice(1, -1));
        line = line.replace("~%#LINK HERE#%~", extractedLinkText)
        line = line.replace(blockquoteLink[0], '')
        
    }

    return `<p class="p-blockquote">${line}</p>`
}

// adds <p> tags and replaces all <> with html entities
function formatCodeblocksLine(line) {
    
    line = stripHtmlBrackets(line)
    return `<p class="p-code markdown-code">${line}</p>`
    
}

function checkForInlineCode(line) {

    var codeSnippet = line.match(/`([^`]+)`/g)
    
    // Format inline code
    if (codeSnippet) {
        
        const minusArr = codeSnippet[0]
        const minusQuotes = codeSnippet.map(line => line.slice(1, -1))
        const minusQuotesAndArr = minusQuotes[0]
        const encodedText = minusQuotesAndArr.replace(/</g, '&lt;').replace(/>/g, '&gt;')

        line = line.replace(minusArr, `<span class="markdown-code p-inline-code">${encodedText}</span>`)

    }
    return line
}

export function getFilesFromLocalStorage() {

    // Check Local Storage for cached files
    if (JSON.parse(localStorage.getItem("markdownFiles"))) {
        return JSON.parse(localStorage.getItem("markdownFiles"))
        
    }
    
    // Create default welcome file and store in Local Storage
    else {
        
        let welcomeContent = `# Welcome to Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
        
## How to use this?

1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window

### Features

- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
- Choose between Light or Dark mode depending on your preference

> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

#### Headings

To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

##### Lists

You can see examples of ordered and unordered lists above.

###### Code Blocks

This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

\`\`\`
<main>
    <h1>This is a larger code block</h1>
</main>
\`\`\``

        const welcomeFile = [
            {
                "createdAt": new Date(),
                "name": "welcome.md",
                "content": welcomeContent
              }
        ]

        localStorage.setItem("markdownFiles", JSON.stringify(welcomeFile))
        return JSON.parse(localStorage.getItem("markdownFiles"))
    }
}

// Runs at startup to render the users last edited file from Local Storage
export function renderLastEditedFile(filesArr) {

    const lastEditedFile = getLastEditedFile(filesArr)
    const markdownInputEl = document.getElementById("markdown-input")

    markdownInputEl.value = lastEditedFile.content

    renderMarkdownContent(lastEditedFile.content)
    renderFileName(lastEditedFile.name)

}

// Reders all files from Local Storage to #sb-doclist-wr
export function renderFilesInfoToSidebar(filesArr) {

    const sidebarDivEl = document.getElementById("sb-doclist-wr")
    let filesHtml = ''
    
    // loop through arr
    filesArr.forEach(file => {
        
        filesHtml += `
<div class="sb-doc-wr">
<img src="/assets/icon-document.svg" alt="document-icon" class="document-icon">
<div class="sb-doc-details-wr">
    <p class="sb-doc-date body-m">${file.createdAt.substring(0, 10)}</p>
    <p class="sb-doc-name heading-m">${file.name}</p>
</div>
</div>`
    })

    sidebarDivEl.innerHTML = filesHtml
        
}

// Gets last edited file from Local Storage
function getLastEditedFile(filesArr) {
    
    let lastEditedFile = filesArr[0]
    let highestDate = 0
    let highestTime = 0

    filesArr.forEach(file => {
        const date = (file.createdAt.replace(/-/g, "")).substring(0, 8)
        const time = (file.createdAt.replace(/:/g, "")).substring(11, 17)
        
        if ( date > highestDate ) {
            lastEditedFile = file
        }
        else if ( date === highestDate ) {
            if ( time > highestTime ) {
                lastEditedFile = file
            }
        }
    })

    return lastEditedFile
}

// Parses through #markdown-input and formats the markdown text to #preview-content
export function renderMarkdownContent(content) {

    const previewContentEl = document.getElementById("preview-content") 
    const markdownText = document.getElementById("markdown-input").value
    
    content = parseMarkdownText(markdownText)
    
    previewContentEl.innerHTML = content
}

// Renders file.name to #file-name
function renderFileName(name) {
    
    const fileNameEl = document.getElementById("file-name")
    fileNameEl.value = name
    fileNameEl.setAttribute('data-name', name);

}

// Opens and closes sidebar
export function handleMenuBtn() {

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

// Updates file in Local storage
export function handleSaveChangesBtn(){

    const currentFileName = document.getElementById("file-name").dataset.name
    const updatedFileContent = document.getElementById("markdown-input").value
    const updatedFileName = document.getElementById("file-name").value
    

    // Pull Local Storage
    let markdownFilesData = getFilesFromLocalStorage()
    
    // Update File Data
    markdownFilesData.forEach(file => {
        if (file.name === currentFileName) {
            
            file.content = updatedFileContent
            file.name = updatedFileName
            file.createdAt = new Date().toISOString()

        }
    })


    renderFilesInfoToSidebar(markdownFilesData)

    // Push updated data to Local Storage
    const updatedDataString = JSON.stringify(markdownFilesData)
    localStorage.setItem('markdownFiles', updatedDataString)

    // Update #file-name data attribute
    document.getElementById("file-name").dataset.name = updatedFileName
}

// Created a new file and pushes it to local storage
export function handleNewDocBtn() {
    
    // Change file name
    const fileNameEl = document.getElementById("file-name")
    fileNameEl.value = "new-document.md"
    fileNameEl.dataset.name = "new-document.md"

    // Clear #markdown-input & #preview-content
    document.getElementById("markdown-input").value = ''
    document.getElementById("preview-content").innerHTML = ''

    // Push new file to Local storage
    let markdownFilesData = getFilesFromLocalStorage()
    markdownFilesData.push(
        {
            createdAt: new Date().toISOString(),
            name: "new-document.md",
            content: ''
        }
        )

    renderFilesInfoToSidebar(markdownFilesData)
    
    const updatedDataString = JSON.stringify(markdownFilesData)
    localStorage.setItem('markdownFiles', updatedDataString)
    
    
}

