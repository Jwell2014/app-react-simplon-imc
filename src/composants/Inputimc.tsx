import React from 'react';


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
            <h3>Indiquez votre {genre} : </h3>
            <input
                type="text"
                placeholder={type}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Inputimc;