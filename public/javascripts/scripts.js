const replaceableStrings = {
    "/": "\\frac{ ",
    "_": "_{}",
    "^": "^{}",
    "%": "\\%"
};
const spaceChars = ["!", "(", ")", "*", "+", "-", "="]
const prohibitKeys = [8, 37, 39]

let input = document.getElementById("userInput")
let output = document.getElementById("ltx_out")

const backspace = 8;

input.addEventListener('keyup', (event) => {
    let current_value = input.value;
    let last_char = current_value.charAt(input.selectionStart-1)
    if (replaceableStrings[last_char] !== undefined && !prohibitKeys.includes(event.keyCode)) {
        if(last_char==='/'){
            const left = current_value.slice(0,input.selectionEnd).split(' ')
            let left_last = left.slice(-1).toString()
            console.log(left_last)
            if(left_last.match(/\((.*?)\)/)!==null) {
                const numerator = left_last.match(/\((.*?)\)/).slice(-1).toString()
                input.value = current_value.slice(0, current_value.lastIndexOf(numerator) - 1) + replaceableStrings[last_char] + numerator + " }{ }" + current_value.slice(input.selectionEnd);
            }
            else input.value = current_value.slice(0, current_value.lastIndexOf(left_last)) + replaceableStrings[last_char] + left_last.slice(0,-1) + " }{ }" + current_value.slice(input.selectionEnd);
        }
        else input.value = current_value.slice(0, input.selectionStart-1) + replaceableStrings[last_char] + current_value.slice(input.selectionEnd);
        input.selectionEnd = input.selectionEnd - 1 ;
    } else if(spaceChars.includes(last_char) && !prohibitKeys.includes(event.keyCode)) input.value = current_value.slice(0,input.selectionEnd-1) + " " + last_char + " " + current_value.slice(input.selectionEnd)
    try {
        katex.render(input.value, output, {
            displayMode: true
        });
    } catch (err) {
        while (output.lastChild) {
            output.removeChild(output.lastChild);
        }
        var msg = document.createTextNode(err.message);
        var span = document.createElement("span");
        span.appendChild(msg);
        output.appendChild(span);
        span.setAttribute("class", "errorMessage");
    }
});
