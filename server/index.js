const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the CORS middleware
app.use(cors());

// Luhn Algorithm Validation
function isValidCreditCard(value) {
    let nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
              nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}

app.post('/validate', (req, res) => {
    const { cardNumber } = req.body;

    if (isValidCreditCard(cardNumber)) {
        res.json({ isValid: true });
    } else {
        res.json({ isValid: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
