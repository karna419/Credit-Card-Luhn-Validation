import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [cardNumber, setCardNumber] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false); // State to handle loading while validating.

    const validateCard = async () => {
        // If there's no card number or it's just whitespace, return.
        if (!cardNumber || cardNumber.trim() === "") {
            // Optionally set a state for an error message
            return;
        }

        setLoading(true); // Indicate the start of the validation process.

        try {
            // Send the card number to our server to be validated.
            const response = await axios.post('http://localhost:5000/validate', { cardNumber });
             // const response = await axios.post('https://luhn-valid-8b66add23927.herokuapp.com/validate', { cardNumber }); // This is the deployed version.
            setIsValid(response.data.isValid); // Set the result of the validation.
        } catch (error) {
            console.error("Error validating card:", error);
            // Optionally handle more specific errors like 400 for invalid input
        } finally {
            setLoading(false); // Stop the loading indication regardless of success or failure.
        }
    };

    return (
        <div className={`App ${isValid ? 'is-valid' : ''}`}>
            <h1>Credit Card Validation</h1>
            
            {/* Input for users to type their card number */}
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                className="card-input"
            />
            
            {/* Button to trigger the card validation */}
            <button onClick={validateCard} className="validate-button">
                {loading ? "Validating..." : "Validate"} 
                {/* Button text changes based on loading state */}
            </button>
            
            {/* Display the result of the validation */}
            {isValid !== null && (
                <p>{isValid ? "Valid Card Number!" : "Invalid Card Number."}</p>
            )}
        </div>
    );
}

export default App;
