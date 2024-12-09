const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; // Real API URL here

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');
const convertButton = document.getElementById('convertButton');

// Fetch currency data and populate dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch(`${apiUrl}USD`);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach((currency) => {
            const optionFrom = document.createElement('option');
            const optionTo = document.createElement('option');
            optionFrom.value = optionTo.value = currency;
            optionFrom.textContent = optionTo.textContent = currency;

            fromCurrency.appendChild(optionFrom);
            toCurrency.appendChild(optionTo);
        });

        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    } catch (error) {
        alert('Error fetching currency data. Please try again.');
        console.error(error);
    }
}

// Perform the conversion
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        alert('Error performing conversion. Please try again.');
        console.error(error);
    }
}

convertButton.addEventListener('click', convertCurrency);

// Initialize app
populateCurrencies();
