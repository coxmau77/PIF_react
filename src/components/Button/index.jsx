import React from 'react';

function Button({ buttonText, onClick }) {
    return (
        <button onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;
