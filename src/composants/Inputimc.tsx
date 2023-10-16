import React, { useEffect, useState } from 'react';


interface InputimcProps {
    type: string;
    genre: string;
    inputValue: string;
    onInputChange: (value: string) => void;
}

function Inputimc({ type, genre, inputValue, onInputChange }: InputimcProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
    };


    return (
        <div>
            <p>Indiquez votre {genre} : </p>
            <input
                type="text"
                placeholder={type}
                value={inputValue}
                onChange={handleInputChange}
                style={{ textAlign: 'end', width: '200px' }}
            />
        </div>
    );
}

export default Inputimc;