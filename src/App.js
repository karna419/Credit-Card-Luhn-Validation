import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [cardNumber, setCardNumber] = useState('');
    const [isValid, setIsValid] = useState(null);

    const validateCard = async () => {
        try {
            const response = await axios.post('https://luhn-valid-8b66add23927.herokuapp.com/validate', { cardNumber });
            setIsValid(response.data.isValid);
        } catch (error) {
            console.error("Error validating card:", error);
        }
    };

    return (
        <div className={`App ${isValid ? 'is-valid' : ''}`}>
            <h1>Credit Card Validation</h1>
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                className="card-input"
            />
            <button onClick={validateCard} className="validate-button">Validate</button>
            {isValid !== null && (
                <p>{isValid ? "Valid Card Number!" : "Invalid Card Number."}</p>
            )}
        </div>
    );
}

export default App;
