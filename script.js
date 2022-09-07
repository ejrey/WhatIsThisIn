function getOptionChosen(val) {
    const weatherDiv = document.getElementById("weatherComponents");
    const gasDiv = document.getElementById("gasComponents");
    const speedDiv = document.getElementById("speedComponents");
    const currencyDiv = document.getElementById("currencyComponents");
    switch (val) {
        case "weather":
            weatherDiv.style.display = 'block';
            gasDiv.style.display = 'none';
            speedDiv.style.display = 'none';
            currencyDiv.style.display = 'none';
            document.body.style.backgroundImage = "url('assets/weather2.gif')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100%"
            break
        case "gas":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'block';
            speedDiv.style.display = 'none';
            currencyDiv.style.display = 'none';
            document.body.style.backgroundImage = "url('assets/gas.jpg')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100%"
            break
        case "speed":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'none';
            speedDiv.style.display = 'block';
            currencyDiv.style.display = 'none';
            document.body.style.backgroundImage = "url('assets/speed2.jpg')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100%"
            break
        case "currency":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'none';
            speedDiv.style.display = 'none';
            currencyDiv.style.display = 'block';
            document.body.style.backgroundImage = "url('assets/world.jpg')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100%"
            getIsoCodes();
            break;
        default:
            break;
    }
}


async function randomFactAboutNumber(value) {

    let response = await fetch("http://numbersapi.com/" + value);
    let data = await response.text();
    document.getElementById("randomFact").innerHTML = data;
}

function convert() {
    const option = document.getElementById("optionChosen").value;
    switch (option) {
        case "weather":
            const weatherValue = document.getElementById("degreeChosen").value;
            switch (weatherValue) {
                case "celsius":
                    const inCelsius = ((document.getElementById("weatherNumber").value - 32) * 5/9);
                    if (Number.isInteger(inCelsius)) {
                        document.getElementById("resultConvertWeather").innerHTML = inCelsius + " \u00B0C ";
                    }else {
                        document.getElementById("resultConvertWeather").innerHTML = inCelsius.toFixed(4) + " \u00B0C ";
                    }

                    randomFactAboutNumber(Math.floor(inCelsius));

                    break;
                case "fahrenheit":
                    const inFahrenheit = ((document.getElementById("weatherNumber").value * 9/5) + 32);
                    if (Number.isInteger(inFahrenheit)) {
                        document.getElementById("resultConvertWeather").innerHTML = inFahrenheit + " \u00B0F ";
                    }else {
                        document.getElementById("resultConvertWeather").innerHTML = inFahrenheit.toFixed(1) + " \u00B0F ";
                    }
                    randomFactAboutNumber(Math.floor(inFahrenheit));
                    break;
                default:
                    break;
            }
            break
        case "gas":
            const gasValue = document.getElementById("gasChosen").value;

            const key = config.API_KEY;
            switch (gasValue) {
                case "litres":
                    let litresRequest = new XMLHttpRequest();
                    litresRequest.open("GET", "https://v6.exchangerate-api.com/v6/" + key + "pair/USD/CAD/1.00");
                    litresRequest.send();
                    litresRequest.onload = ()=>{
                        var conversionResult = (JSON.parse(litresRequest.response));
                        let conversionValue = conversionResult.conversion_result.toFixed(2);
                        const litresPrice = document.getElementById("gasNumber").value;
                        const litre = 3.78541;
                        const priceInLitres = (litresPrice * conversionValue) / litre;
                        document.getElementById("resultConvertGas").innerHTML = "$" + priceInLitres.toFixed(2) + "/L";
                        randomFactAboutNumber(Math.floor(priceInLitres));
                    }
                    break;
                case "gallons":
                    let gallonsRequest = new XMLHttpRequest();
                    gallonsRequest.open("GET", "https://v6.exchangerate-api.com/v6/" + key + "pair/CAD/USD/1.00");
                    gallonsRequest.send();
                    gallonsRequest.onload = ()=>{
                        var conversionResult = (JSON.parse(gallonsRequest.response));
                        let conversionValue = conversionResult.conversion_result.toFixed(2);
                        const gallonsPrice = document.getElementById("gasNumber").value;
                        const gallons = 0.264172;
                        const priceInGallons = (gallonsPrice * conversionValue) / gallons;
                        document.getElementById("resultConvertGas").innerHTML = "$" + priceInGallons.toFixed(2) + "/g";
                        randomFactAboutNumber(Math.floor(priceInGallons));
                    }
            }
            break
        case "speed":
            const speedValue = document.getElementById("speedChosen").value;
            switch (speedValue) {
                case "kmh":
                    const inMPH = document.getElementById("speedNumber").value * 1.60934;
                    document.getElementById("resultConvertSpeed").innerHTML = inMPH.toFixed(1) + "km/h";
                    randomFactAboutNumber(Math.floor(inMPH));
                    break;
                case "mph":
                    const inKPH = document.getElementById("speedNumber").value / 1.60934;
                    document.getElementById("resultConvertSpeed").innerHTML = inKPH.toFixed(1) + "mph";
                    randomFactAboutNumber(Math.floor(inKPH));
                    break;
                default:
                    break;
            }
            break
        case "currency":
            const dollarValue = document.getElementById("currencyNumber").value;
            const chosenCurrencyOne = document.getElementById("currencyOptionsOne").value.slice(0,3);
            const chosenCurrencyTwo = document.getElementById("currencyOptionsTwo").value.slice(0,3);
            getCurrencyExchange(chosenCurrencyOne, chosenCurrencyTwo, dollarValue);
            // console.log(currencyValue);
            break
        default:
            break
    }
}

function getIsoCodes() {
    const key = config.API_KEY;
    let request = new XMLHttpRequest();
    request.open("GET", "https://v6.exchangerate-api.com/v6/" + key + "/codes")
    request.send();
    request.onload = ()=>{
        var isoCodes = (JSON.parse(request.response));
        for (let i = 0; i < isoCodes.supported_codes.length; i++) {
            var optionOne = document.createElement("option");
            var selectOne = document.getElementById("currencyOptionsOne");
            optionOne.value = isoCodes.supported_codes[i][0] + ": " + isoCodes.supported_codes[i][1];
            optionOne.innerHTML = isoCodes.supported_codes[i][0] + ": " + isoCodes.supported_codes[i][1];
            selectOne.append(optionOne);

            var optionTwo = document.createElement("option");
            var selectTwo = document.getElementById("currencyOptionsTwo");
            optionTwo.value = isoCodes.supported_codes[i][0] + ": " + isoCodes.supported_codes[i][1];
            optionTwo.innerHTML = isoCodes.supported_codes[i][0] + ": " + isoCodes.supported_codes[i][1];
            selectTwo.append(optionTwo);
        }
    }
}

function getCurrencyExchange(chosenCurrencyOne, chosenCurrencyTwo, dollarValue) {
    const key = config.API_KEY;
    let request = new XMLHttpRequest();
    request.open("GET", "https://v6.exchangerate-api.com/v6/" + key + "pair/" + chosenCurrencyOne + "/" + chosenCurrencyTwo + "/" + dollarValue);
    request.send();
    request.onload = ()=>{
        var conversionResult = (JSON.parse(request.response));
        console.log(conversionResult.conversion_result);
        document.getElementById("resultOfCurrencyConvert").innerHTML = "$" + conversionResult.conversion_result.toFixed(2);
        randomFactAboutNumber(Math.floor(conversionResult.conversion_result.toFixed(2)));
    }
}

function start() {
    getOptionChosen('weather');
}
