import React, { useState } from 'react';


interface InputimcProps {
    type: string;
    genre: string;
    inputData: (value: string) => void;
}

function Inputimc({ type, genre, inputData }: InputimcProps) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        inputData(event.target.value);
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