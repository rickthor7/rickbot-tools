const unitType = document.getElementById("unitType");
const inputUnit = document.getElementById("inputUnit");
const outputUnit = document.getElementById("outputUnit");
const convertButton = document.getElementById("convertButton");
const result = document.getElementById("result");

const units = {
    length: ["Meters", "Kilometers", "Miles", "Feet"],
    weight: ["Grams", "Kilograms", "Pounds", "Ounces"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

const conversions = {
    length: {
        Meters: { Kilometers: 0.001, Miles: 0.000621371, Feet: 3.28084 },
        Kilometers: { Meters: 1000, Miles: 0.621371, Feet: 3280.84 },
        Miles: { Meters: 1609.34, Kilometers: 1.60934, Feet: 5280 },
        Feet: { Meters: 0.3048, Kilometers: 0.0003048, Miles: 0.000189394 }
    },
    weight: {
        Grams: { Kilograms: 0.001, Pounds: 0.00220462, Ounces: 0.035274 },
        Kilograms: { Grams: 1000, Pounds: 2.20462, Ounces: 35.274 },
        Pounds: { Grams: 453.592, Kilograms: 0.453592, Ounces: 16 },
        Ounces: { Grams: 28.3495, Kilograms: 0.0283495, Pounds: 0.0625 }
    },
    temperature: {
        Celsius: { Fahrenheit: (val) => (val * 9) / 5 + 32, Kelvin: (val) => val + 273.15 },
        Fahrenheit: { Celsius: (val) => (val - 32) * 5 / 9, Kelvin: (val) => ((val - 32) * 5) / 9 + 273.15 },
        Kelvin: { Celsius: (val) => val - 273.15, Fahrenheit: (val) => ((val - 273.15) * 9) / 5 + 32 }
    }
};

unitType.addEventListener("change", updateUnits);
convertButton.addEventListener("click", convertUnits);

function updateUnits() {
    const type = unitType.value;
    inputUnit.innerHTML = "";
    outputUnit.innerHTML = "";
    units[type].forEach((unit) => {
        inputUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

function convertUnits() {
    const type = unitType.value;
    const fromUnit = inputUnit.value;
    const toUnit = outputUnit.value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);

    if (!inputValue || fromUnit === toUnit) {
        result.textContent = "Please enter a valid value and select different units.";
        return;
    }

    let convertedValue;

    if (typeof conversions[type][fromUnit][toUnit] === "function") {
        convertedValue = conversions[type][fromUnit][toUnit](inputValue);
    } else {
        convertedValue = inputValue * conversions[type][fromUnit][toUnit];
    }

    result.textContent = `${inputValue} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
}

updateUnits(); // Initialize units
