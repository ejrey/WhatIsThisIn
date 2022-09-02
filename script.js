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
            break
        case "gas":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'block';
            speedDiv.style.display = 'none';
            currencyDiv.style.display = 'none';
            break
        case "speed":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'none';
            speedDiv.style.display = 'block';
            currencyDiv.style.display = 'none';
            break
        case "currency":
            weatherDiv.style.display = 'none';
            gasDiv.style.display = 'none';
            speedDiv.style.display = 'none';
            currencyDiv.style.display = 'block';
            break;
        default:
            break;
    }
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
                        document.getElementById("resultConvertWeather").innerHTML = inCelsius;
                    }else {
                        document.getElementById("resultConvertWeather").innerHTML = inCelsius.toFixed(4);
                    }
                    break;
                case "fahrenheit":
                    const inFahrenheit = ((document.getElementById("weatherNumber").value * 9/5) + 32);
                    if (Number.isInteger(inFahrenheit)) {
                        document.getElementById("resultConvertWeather").innerHTML = inFahrenheit;
                    }else {
                        document.getElementById("resultConvertWeather").innerHTML = inFahrenheit.toFixed(1);
                    }
                    break;
                default:
                    break;
            }
            break
        case "gas":
            console.log(2);
            break
        case "speed":
            const speedValue = document.getElementById("speedChosen").value;
            switch (speedValue) {
                case "kmh":
                    const inMPH = document.getElementById("speedNumber").value * 1.60934;
                    document.getElementById("resultConvertSpeed").innerHTML = inMPH.toFixed(4);
                    break;
                case "mph":
                    const inKPH = document.getElementById("speedNumber").value / 1.60934;
                    document.getElementById("resultConvertSpeed").innerHTML = inKPH.toFixed(4);
                    break;
                default:
                    break;
            }
            break
        case "currency":
            console.log(4);
            break
        default:
            break
    }

}
