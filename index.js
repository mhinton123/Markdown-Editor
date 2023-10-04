const menuIconEl = document.getElementById("hdr-menu-icon")
const sidebarDivEl = document.getElementById("sb-wr")
const markdownInputEl = document.getElementById("markdown-input")

markdownInputEl.addEventListener("input", function(e){
    
    const markdownText = e.target.value
    parseMarkdownText(markdownText)

})

function parseMarkdownText(markdownText) {
    
    const textTolineArr = markdownText.split('\n')
    const previewHtml = ``
    let isCode = false
    
    textTolineArr.forEach(line => {
        
        
        
        // Check for headings
        if (line.startsWith("# ")) {
            console.log("The string starts with '# '.");
        } 
        else if (line.startsWith("## ")){
            console.log("The string starts with '## '.");
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
        // Check for code block
        else if (line.startsWith("```") && isCode === false){
            console.log("The string starts with '```'.");
            isCode = true
        }
        else if (line.startsWith("```") && isCode === true){
            console.log("The string starts with '```'.");
            isCode = false
        }
        else if (isCode === true){
            console.log(line + " is a line of code")
        }
        else if (line === ''){
            console.log("<br>")
        }
        else{
            console.log("this is body text")
        }

          
          
          
          
    
    })
}

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