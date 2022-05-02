

// Dom
const result = document.querySelectorAll('span')[0]
const copy = document.querySelector('#clipboard')
const passLength = document.querySelector('#length')
const upper = document.querySelector('#uppercase')
const lower = document.querySelector('#lowercase')
const number = document.querySelector('#numbers')
const symbol = document.querySelector('#symbols')
const generator = document.querySelector('#generate')



//generate events 
generator.addEventListener('click', () => {
    let Length = +passLength.value;
    let hasLower = lower.checked;
    let hasUpper = upper.checked;
    let hasNumber = number.checked;
    let hasSymbol = symbol.checked;
    result.innerHTML = generatePassword(Length, hasUpper, hasLower, hasNumber, hasSymbol);
})



//generate password function
function generatePassword(PassLength, Upper, Lower, Number, Symbol) {
    let finalPassword = '';

    let typeCount = Upper + Lower + Number + Symbol;


    let typeArr = [{ Upper }, { Lower }, { Number }, { Symbol }].filter(x =>
        Object.values(x)[0]
    )

    if (typeCount == 0) {
        return 'select somthing bro'
    }

    for (let i = 0; i < PassLength; i += typeCount) {
        typeArr.forEach(x => {
            let funcName = Object.keys(x)[0]
            finalPassword += randomFunc[funcName]()
        })
    }
    return finalPassword.slice(0, PassLength)
}



// Generate Functions
let randomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
let randomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
let randomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
let randomSymbol = () => {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33)
}



// All generate functions in one object
let randomFunc = {
    Lower: randomLower,
    Upper: randomUpper,
    Number: randomNumber,
    Symbol: randomSymbol
}

copy.addEventListener('click', () => {
    let textArea = document.createElement('textarea');
    let password = result.innerText;

    if (!password) {
        return
    };

    textArea.value = password;
    document.body.appendChild(textArea)
    textArea.select();
    document.execCommand('copy')
    textArea.remove()

})