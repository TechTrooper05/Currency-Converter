const apiKey = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let options = document.querySelectorAll(".dropdown select");
let button = document.querySelector("button");
let toCountry = document.querySelector(".to select");
let  fromCountry = document.querySelector(".from select");
let msg = document.querySelector(".converted-val");
for (let country of options) {
    for (let code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if (country.name==="from" && code ==="USD"){
            newOpt.selected = true;
        } else if (country.name==="to" && code==="INR"){
            newOpt.selected=true;
        }
        country.append(newOpt);
    }
    country.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
const calcExchangeRate = async ()=> {
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    const URL = `${apiKey}/${fromCountry.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let fromCurrCode = fromCountry.value.toLowerCase()
    let exchangeData = data[fromCurrCode];
    let toCurrCode = toCountry.value.toLowerCase();
    let amt =  exchangeData[toCurrCode];
    let exchangeVal = amtVal*amt;
    msg.innerText = `${amtVal} ${fromCountry.value} = ${exchangeVal} ${toCountry.value}`;
}
button.addEventListener("click", (evt)=>{
    evt.preventDefault();
    calcExchangeRate();
})