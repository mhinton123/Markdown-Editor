// Formats each line of input based on markdown syntax
export function parseMarkdownText(markdownText) {
    
    const textTolineArr = markdownText.split('\n')
    let isCode = false
    let html = ''
    
    textTolineArr.forEach((line, index) => {
             
        // Check for headings
        if (line.startsWith("# ")) {
            line = line.substring(2)
            html += `<h1 class="p-h1">${line}</h1>`
        } 
        else if (line.startsWith("## ")){
            line = line.substring(3)
            html += `<h2 class="p-h2">${line}</h2>`
        }
        else if (line.startsWith("### ")){
            line = line.substring(4)
            html += `<h3 class="p-h3">${line}</h3>`
        }
        else if (line.startsWith("#### ")){
            line = line.substring(5)
            html += `<h4 class="p-h4">${line}</h4>`
        }
        else if (line.startsWith("##### ")){
            line = line.substring(6)
            html += `<h5 class="p-h5">${line}</h5>`
        }
        else if (line.startsWith("###### ")){
            line = line.substring(7)
            html += `<h6 class="p-h6">${line}</h6>`
        }

        // Check for ordered lists
        else if (typeof parseInt(line[0]) === 'number' & line[1] === '.'){
            line = line.substring(3)
            html += formatListItems(line, index, textTolineArr, "ol")

        }
        else if (typeof parseInt(line[0]) === 'number' && typeof parseInt(line[0]) === 'number'&& line[2] === '.') {
            line = line.substring(4)
            html += formatListItems(line, index, textTolineArr, "ol")
  
        }

        // Check for unordered lists
        else if (line.startsWith("- ")){
            line = line.substring(2)
            html += formatListItems(line, index, textTolineArr, "ul")
            
        }

        // Check for blockquote    TODO (look into inline links for this)
        else if (line.startsWith("> ")){
            line = line.substring(2)
            html += formatBlockQuote(line)
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
            html += `<br>`
        }

        // Anything else is body text
        else{
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

    if (blockquoteName && blockquoteLink) {
        
        // Format name
        let extractedNameText = blockquoteName.map(name => name.slice(1, -1));
        line = line.replace(blockquoteName[0], `<a class="p-link" href="~%#LINK HERE#%~">${extractedNameText}</a>`)
        
        // Format link
        let extractedLinkText = blockquoteLink.map(link => link.slice(1, -1));
        line = line.replace("~%#LINK HERE#%~", extractedLinkText)
        line = line.replace(blockquoteLink[0], '')
        
    }

    return `<p class="p-blockquote">${line}</p>`
}

function checkForInlineCode(line) {

    var codeSnippet = line.match(/`([^`]+)`/g);
    
    // Format inline code
    if (codeSnippet) {
        
        const minusArr = codeSnippet[0]
        const minusQuotes = codeSnippet.map(line => line.slice(1, -1));
        const minusQuotesAndArr = minusQuotes[0]
        const encodedText = minusQuotesAndArr.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        line = line.replace(minusArr, `<span class="markdown-code p-inline-code">${encodedText}</span>`)
        
        console.log(codeSnippet)
        console.log(minusArr)
        console.log(minusQuotes)
        console.log(minusQuotesAndArr)
        console.log(encodedText)

    }
    return line
}