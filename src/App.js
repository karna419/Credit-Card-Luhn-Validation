import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [cardNumber, setCardNumber] = useState('');
    const [isValid, setIsValid] = useState(null);

    const validateCard = async () => {
        try {
            const response = await axios.post('http://localhost:5000/validate', { cardNumber });
            setIsValid(response.data.isValid);
        } catch (error) {
            console.error("Error validating card:", error);
        }
    };

    return (
        <div className="App">
            <h1>Credit Card Validation</h1>
            <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
                placeholder="Enter your card number"
            />
            <button onClick={validateCard}>Validate</button>
            {isValid !== null && (
                <p>{isValid ? "Valid Card Number!" : "Invalid Card Number."}</p>
            )}
        </div>
    );
}

export default App;
