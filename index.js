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
    
    console.log(previewHtml)
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
    
    textTolineArr.forEach(line => {
             
        // Check for headings
        if (line.startsWith("# ")) {
            formatLineToHtml("h1", line)
        } 
        else if (line.startsWith("## ")){
            formatLineToHtml("h2", line)
        }
        else if (line.startsWith("### ")){
            console.log("The string starts with '### '.");
        }
        else if (line.startsWith("#### ")){
            console.log("The string starts with '#### '.");
        }
        else if (line.startsWith("##### ")){
            console.log("The string starts with '##### '.");
        }
        else if (line.startsWith("###### ")){
            console.log("The string starts with '###### '.");
        }
        // Check for ordered lists
        else if (typeof parseInt(line[0]) === 'number' & line[1] === '.'){
            console.log("The string is a ol with 1 digit.")
        }
        else if (typeof parseInt(line[0]) === 'number' && typeof parseInt(line[0]) === 'number'&& line[2] === '.') {
            console.log("The string is a ol with 2 digits.")
        }
        // Check for unordered lists
        else if (line.startsWith("- ")){
            console.log("The string starts with '- '.");
        }
        // Check for blockquote    TODO (look into inline links for this)
        else if (line.startsWith("> ")){
            console.log("The string starts with '> '.");
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

function formatLineToHtml(element, innerText) {

    if ( element === "h1" ) {
        previewHtml += `<h1 class="p-h1">${innerText}</h1>`
    }
    if ( element === "h2" ) {
        previewHtml += `<h2 class="p-h2">${innerText}</h2>`
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