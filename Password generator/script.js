const pw = document.getElementById("pw");
const copy = document.getElementById("copy");
const length = document.getElementById("length");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const btn_generate = document.getElementById("generate-pw");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrst";
const numbers = "0123456789";
const symbols = "!@#$%^&*(<;)_+'=-{/?>}.:";
// console.log(symbols);

function getLowercase() {
  return lowerCase[Math.floor(Math.random() * lowerCase.length)];
}

function getUppercase() {
  return upperCase[Math.floor(Math.random() * upperCase.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbols() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const len = length.value;

  let password = "";

  for (let i = 0; i < len; i++) {
    password += generateX();
  }
//   console.log(password);
  return password;
}

function generateX() {
  const xs = [];
    if (upper.checked) {    
      // console.log(getUppercase());
      xs.push(getUppercase());
    }
    if (lower.checked) {
        xs.push(getLowercase());
    }
    if (number.checked) {
        // console.log("true toh hai");
        // console.log(getNumber());
        xs.push(getNumber());
    }
    if (symbol.checked) {
        xs.push(getSymbols());
    }
    // console.log(xs);
    return xs[Math.floor(Math.random() * xs.length)];
}

btn_generate.addEventListener("click", () => {

    if(upper.checked || lower.checked || number.checked || symbol.checked)
    pw.innerText = generatePassword();
    else
    pw.innerText = "Select atleast one";
});

copy.addEventListener("click", ()=>{
    var text = pw;
    // console.log(text);

    navigator.clipboard.writeText(text.innerText);
    // console.log(text);
});